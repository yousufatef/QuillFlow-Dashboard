import Cookies from 'js-cookie';
import { REFRESH_TOKEN, TOKEN } from '../constants';
import { removeAuthCookies } from './cookies';
import { getCurrLocale } from './language';
import { concatErrors } from './errors';
import type {
  ApiErrorResponse,
  ApiRequestOptions,
  ApiResult,
  RefreshTokenResponse,
  ValidationErrorApiResponse,
} from '../types/auth.types';

const API_URL_RAW = import.meta.env.VITE_BASE_URL as string | undefined;

if (!API_URL_RAW) {
  throw new Error('Missing VITE_BASE_URL environment variable');
}

const API_URL: string = API_URL_RAW;

let refreshTokenPromise: Promise<string | null> | null = null;

// --- Exported form helpers ---

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

export const trimStringValues = <T>(obj: T): T => {
  if (typeof obj === 'string') return obj.trim() as T;

  if (Array.isArray(obj)) {
    return (obj as unknown[]).map((item) => trimStringValues(item)) as T;
  }

  if (isPlainObject(obj)) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = trimStringValues(value);
    }
    return result as T;
  }

  return obj;
};

export const InputTrimmer = (value: unknown) => {
  if (typeof value === 'string') {
    // Preserve line breaks while removing excessive spaces on each line
    return value
      .split('\n')
      .map(line => line.replace(/ {2,}/g, ' ').trimStart())
      .join('\n');
  }
  return value;
};

// --- Auth ---

function getAuthToken() {
  return Cookies.get(TOKEN);
}

function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN);
}

function redirectToSignin() {
  removeAuthCookies();
  const returnUrl = window.location.pathname + window.location.search;
  window.location.href = `/login?callbackUrl=${encodeURIComponent(returnUrl)}`;
}

function setCookieWithOptionalExpiry(name: string, value: string, expiresAt?: string) {
  Cookies.set(name, value, expiresAt ? { expires: new Date(expiresAt) } : undefined);
}

/** Unwrap `{ result: T }` envelopes returned by some API endpoints. */
function unwrapApiResult<T>(response: T | ApiResult<T>): T {
  if (response !== null && typeof response === 'object' && 'result' in response) {
    return (response as ApiResult<T>).result as T;
  }
  return response as T;
}

// --- Request building ---

function buildUrl(endpoint: string): string {
  const base = API_URL.replace(/\/+$/, '');
  const path = endpoint.replace(/^\/+/, '');
  return `${base}/${path}`;
}

function serializeBody(body: unknown): BodyInit | undefined {
  if (body === undefined) return undefined;
  return body instanceof FormData ? body : JSON.stringify(trimStringValues(body));
}

function buildHeaders(options: ApiRequestOptions, tokenOverride?: string): Headers {
  const headers = new Headers(options.headers);
  headers.set('Language', getCurrLocale());

  const token = tokenOverride ?? getAuthToken();
  if (!options.skipAuth && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const needsJsonContentType =
    options.body !== undefined &&
    !(options.body instanceof FormData) &&
    !headers.has('Content-Type');

  if (needsJsonContentType) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
}

function doFetch(
  endpoint: string,
  options: ApiRequestOptions & { signal?: AbortSignal },
  tokenOverride?: string,
): Promise<Response> {
  const { method = 'GET', body, skipAuth: _skipAuth, ...fetchInit } = options;

  return fetch(buildUrl(endpoint), {
    ...fetchInit,
    method,
    headers: buildHeaders(options, tokenOverride),
    body: serializeBody(body),
  });
}

// --- Response handling ---

function isValidationError(data: ApiErrorResponse | null): data is ValidationErrorApiResponse {
  return Boolean(data && 'errors' in data && data.errors);
}

function getErrorMessage(data: ApiErrorResponse | null, fallback: string): string {
  if (isValidationError(data)) return concatErrors(data);
  return data?.message ?? fallback;
}

async function parseJsonBody<T>(response: Response): Promise<T | null> {
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) return null;

  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function throwIfHttpError(response: Response): Promise<void> {
  if (!response.ok) {
    const errorData = await parseJsonBody<ApiErrorResponse>(response);
    throw new Error(getErrorMessage(errorData, `Request failed with status ${response.status}`));
  }
}

function throwIfApiError<T extends ApiErrorResponse>(data: T | null): asserts data is T {
  if (!data) throw new Error('Empty response from server');
  if (data.isError) throw new Error(data.message || 'Something went wrong');
}

async function handleResponse<T>(response: Response): Promise<T> {
  await throwIfHttpError(response);
  const data = await parseJsonBody<T & ApiErrorResponse>(response);
  throwIfApiError(data);
  return data;
}

// --- Token refresh ---

function storeRefreshedTokens(data: RefreshTokenResponse): string | null {
  const accessToken = data.token ?? data.accessToken;
  if (!accessToken) return null;

  setCookieWithOptionalExpiry(
    TOKEN,
    accessToken,
    data.accessTokenExpiresAt ?? data.accessTokenExpiryTime,
  );

  if (data.refreshToken) {
    setCookieWithOptionalExpiry(
      REFRESH_TOKEN,
      data.refreshToken,
      data.refreshTokenExpiresAt ?? data.refreshTokenExpiryTime,
    );
  }

  return accessToken;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(buildUrl('auth/refresh-token'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Language: getCurrLocale() },
    body: JSON.stringify({ accessToken: getAuthToken(), refreshToken }),
  });

  if (!response.ok) {
    removeAuthCookies();
    return null;
  }

  const data = unwrapApiResult(
    (await response.json()) as RefreshTokenResponse | ApiResult<RefreshTokenResponse>,
  );

  return storeRefreshedTokens(data);
}

async function getFreshToken(): Promise<string | null> {
  refreshTokenPromise ??= refreshAccessToken().finally(() => {
    refreshTokenPromise = null;
  });
  return refreshTokenPromise;
}

// --- Public API ---

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions & { signal?: AbortSignal } = {},
): Promise<T> {
  const response = await doFetch(endpoint, options);

  if (response.status === 401 && !options.skipAuth) {
    const newToken = await getFreshToken();
    if (!newToken) {
      redirectToSignin();
      throw new Error('Session expired. Please sign in again.');
    }
    return handleResponse<T>(await doFetch(endpoint, options, newToken));
  }

  return handleResponse<T>(response);
}

/**
 * Run multiple API requests in parallel. All must succeed.
 *
 * @example
 * const [users, posts] = await apiParallel(
 *   apiRequest<User[]>('users'),
 *   apiRequest<Post[]>('posts'),
 * );
 */
export function apiParallel<T extends Promise<unknown>[]>(
  ...requests: T
): Promise<{ -readonly [K in keyof T]: Awaited<T[K]> }> {
  return Promise.all(requests);
}

/**
 * Run multiple API requests in parallel. Returns results even if some fail.
 *
 * @example
 * const [userResult, postResult] = await apiAllSettled(
 *   apiRequest<User>('users/1'),
 *   apiRequest<Post>('posts/1'),
 * );
 * if (userResult.status === 'fulfilled') console.log(userResult.value);
 */
export function apiAllSettled<T extends Promise<unknown>[]>(
  ...requests: T
): Promise<{
  -readonly [K in keyof T]: PromiseSettledResult<Awaited<T[K]>>;
}> {
  return Promise.allSettled(requests);
}
