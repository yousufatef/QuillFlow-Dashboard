import Cookies from 'js-cookie';
import { REFRESH_TOKEN, TOKEN } from '../constants';
import { removeAuthCookies } from './cookies';
import { getCurrLocale } from './language';
import { concatErrors } from './errors';
import type {
  ApiErrorResponse,
  ApiRequestOptions,
  RefreshTokenResponse,
  ValidationErrorApiResponse,
} from '../types/auth-types';

const API_URL = "http://localhost:3000/";
// const API_URL = import.meta.env.VITE_BASE_URL as string | undefined;

// Fail fast when the API base URL is not configured.
if (!API_URL) {
  throw new Error('Missing VITE_BASE_URL environment variable');
}

let refreshTokenPromise: Promise<string | null> | null = null;

type ApiResult<T> = {
  result?: T;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;

  const prototype: unknown = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
};

export const trimStringValues = <T>(obj: T): T => {
  if (typeof obj === 'string') {
    return obj.trim() as T;
  }

  if (Array.isArray(obj)) {
    const values = obj as unknown[];

    return values.map((item) => trimStringValues(item)) as T;
  }

  if (isPlainObject(obj)) {
    const result: Record<string, unknown> = {};

    Object.entries(obj).forEach(([key, value]) => {
      result[key] = trimStringValues(value);
    });

    return result as T;
  }

  return obj;
};

export const InputTrimmer = (value: unknown) => {
  if (typeof value === 'string') {
    return value.replace(/\s{2,}/g, ' ').trimStart();
  }

  return value;
};

// Token helpers
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

function getResult<T>(response: T | ApiResult<T>): T {
  return 'result' in Object(response)
    ? ((response as ApiResult<T>).result as T)
    : (response as T);
}

function setCookieWithOptionalExpiry(
  name: string,
  value: string,
  expiresAt?: string,
) {
  if (expiresAt) {
    Cookies.set(name, value, { expires: new Date(expiresAt) });
    return;
  }

  Cookies.set(name, value);
}

// Request helpers
function serializeBody(body: unknown): BodyInit | undefined {
  if (body === undefined) return undefined;
  return body instanceof FormData
    ? body
    : JSON.stringify(trimStringValues(body));
}

function buildHeaders(
  options: ApiRequestOptions,
  tokenOverride?: string,
): Headers {
  const headers = new Headers(options.headers);
  headers.set('Language', getCurrLocale());

  const token = tokenOverride ?? getAuthToken();
  if (!options.skipAuth && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (
    options.body !== undefined &&
    !(options.body instanceof FormData) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
}

/** Send a single fetch request without retry logic. */
function doFetch(
  endpoint: string,
  options: ApiRequestOptions & { signal?: AbortSignal },
  tokenOverride?: string,
): Promise<Response> {
  const { method = 'GET', body, ...fetchInit } = options;
  delete fetchInit.skipAuth;

  return fetch(`${API_URL}/${endpoint}`, {
    ...fetchInit,
    method,
    headers: buildHeaders(options, tokenOverride),
    body: serializeBody(body),
  });
}

// Response helpers
function isValidationError(
  data: ApiErrorResponse | null,
): data is ValidationErrorApiResponse {
  return !!data && 'errors' in data && !!data.errors;
}

function getErrorMessage(
  data: ApiErrorResponse | null,
  fallback: string,
): string {
  if (isValidationError(data)) return concatErrors(data);
  return data?.message || fallback;
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

/** Parse the response, throwing on HTTP errors or API-level errors. */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await parseJsonBody<ApiErrorResponse>(response);
    throw new Error(
      getErrorMessage(
        errorData,
        `Request failed with status ${response.status}`,
      ),
    );
  }

  const data = await parseJsonBody<T & ApiErrorResponse>(response);

  if (!data) {
    throw new Error('Empty response from server');
  }

  if (data.isError) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Token refresh
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Language: getCurrLocale() },
    body: JSON.stringify({
      accessToken: getAuthToken(),
      refreshToken,
    }),
  });

  if (!response.ok) {
    removeAuthCookies();
    return null;
  }

  const data = getResult(
    (await response.json()) as
    | RefreshTokenResponse
    | ApiResult<RefreshTokenResponse>,
  );
  const newToken = data?.token ?? data?.accessToken;
  const newRefreshToken = data?.refreshToken;
  const accessExpires =
    data?.accessTokenExpiresAt ?? data?.accessTokenExpiryTime;
  const refreshExpires =
    data?.refreshTokenExpiresAt ?? data?.refreshTokenExpiryTime;

  if (!newToken) return null;

  setCookieWithOptionalExpiry(TOKEN, newToken, accessExpires);
  if (newRefreshToken) {
    setCookieWithOptionalExpiry(REFRESH_TOKEN, newRefreshToken, refreshExpires);
  }

  return newToken;
}

/** Deduplicates concurrent refresh calls. */
async function getFreshToken(): Promise<string | null> {
  if (!refreshTokenPromise) {
    refreshTokenPromise = refreshAccessToken().finally(() => {
      refreshTokenPromise = null;
    });
  }

  const token = await refreshTokenPromise;
  if (!token) refreshTokenPromise = null;

  return token;
}

// Public API
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions & { signal?: AbortSignal } = {},
): Promise<T> {
  const response = await doFetch(endpoint, options);

  // 401: attempt token refresh and retry once.
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
