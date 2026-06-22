import Cookies from 'js-cookie';
import { REFRESH_TOKEN, TOKEN } from '../../../constants';
import type {
  ApiResult,
  ChangePasswordParams,
  LoginParams,
  LoginResponse,
  OtpParams,
  RefreshTokenResponse,
  ResetAdminPasswordParams,
} from '../types/auth.types';
import { apiRequest } from '@/utils/api';

function getResult<T>(response: T | ApiResult<T>): T {
  return 'result' in Object(response) ? ((response as ApiResult<T>).result as T) : (response as T);
}

function getData<T>(response: T | ApiResult<T> | { data?: T }): T {
  const result = getResult(response);
  return 'data' in Object(result) ? ((result as { data?: T }).data as T) : (result as T);
}

function setCookieWithOptionalExpiry(name: string, value: string, expiresAt?: string) {
  if (expiresAt) {
    Cookies.set(name, value, { expires: new Date(expiresAt) });
    return;
  }

  Cookies.set(name, value);
}

function saveRefreshTokens(payload: RefreshTokenResponse) {
  const accessToken = payload.accessToken ?? payload.token;
  const refreshToken = payload.refreshToken;
  const accessExpires = payload.accessTokenExpiresAt ?? payload.accessTokenExpiryTime;
  const refreshExpires = payload.refreshTokenExpiresAt ?? payload.refreshTokenExpiryTime;

  if (!accessToken || !refreshToken) {
    throw new Error('Refresh token response is missing tokens.');
  }

  setCookieWithOptionalExpiry(TOKEN, accessToken, accessExpires);
  setCookieWithOptionalExpiry(REFRESH_TOKEN, refreshToken, refreshExpires);
}

export async function getUserDetails<TUser = unknown>() {
  const response = await apiRequest<TUser | ApiResult<TUser>>('/identity/admin/profile', {
    method: 'GET',
  });

  return getResult(response);
}

// ------------------------ LOGIN API ------------------------
export async function loginApi({ email, password }: LoginParams): Promise<LoginResponse> {
  const response = await apiRequest<LoginResponse | ApiResult<LoginResponse>>(
    'identity/admin/auth/login',

    {
      method: 'POST',
      skipAuth: true,
      body: {
        email: email,
        password,
      },
    },
  );

  return getResult(response);
}

// ------------------------ TOKEN REFRESH API ------------------------
export async function refreshTokenApi(): Promise<RefreshTokenResponse> {
  const token = Cookies.get(TOKEN);
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const response = await apiRequest<RefreshTokenResponse | ApiResult<RefreshTokenResponse>>(
    'identity/admin/auth/refresh-token',
    {
      method: 'POST',
      body: {
        accessToken: token,
        refreshToken,
      },
    },
  );

  const payload = getData(response);
  saveRefreshTokens(payload);

  return payload;
}

// ------------------------ FORGET PASSWORD API ------------------------
export async function forgetPasswordApi({ email }: { email: string }) {
  const response = await apiRequest<unknown>(`identity/admin/auth/password/forgot`, {
    method: 'POST',
    skipAuth: true,
    body: { email },
  });
  return response;
}

// ------------------------ OTP VERIFICATION API ------------------------
export async function resendOtpApi({ email }: { email: string }) {
  return apiRequest<unknown>(`identity/admin/auth/password/resend-otp`, {
    method: 'POST',
    skipAuth: true,
    body: { email },
  });
}

// ------------------------ RESEND OTP API ------------------------
export async function otpApi({ otp, email }: OtpParams) {
  const response = await apiRequest<unknown>('identity/admin/auth/password/verify-otp', {
    method: 'POST',
    skipAuth: true,
    body: { otpCode: otp, email },
  });

  return response;
}

// ------------------------ RESET ADMIN PASSWORD API ------------------------
export async function resetAdminPasswordApi({ password, token }: ResetAdminPasswordParams) {
  return apiRequest<unknown>('identity/admin/auth/password/reset', {
    method: 'POST',
    body: {
      newPassword: password,
      confirmNewPassword: password,
      token,
    },
  });
}


// ------------------------ RESET ADMIN PASSWORD API ------------------------
export async function setPasswordInviteApi({ password, token }: ResetAdminPasswordParams) {
  return apiRequest<unknown>('identity/admin/management/set-password-invite', {
    method: 'POST',
    body: {
      password: password,
      confirmPassword: password,
      token,
    },
  });
}

// ------------------------ CHANGE PASSWORD API ------------------------
export async function changePasswordApi(data: ChangePasswordParams) {
  return apiRequest<unknown>('Admins/resetpassword', {
    method: 'POST',
    body: data,
  });
}

// ------------------------ LOGOUT API ------------------------
export async function logOutApi() {
  return apiRequest<unknown>('identity/admin/auth/logout', {
    method: 'POST',
  });
}
