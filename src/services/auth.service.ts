import Cookies from 'js-cookie';
import { REFRESH_TOKEN, TOKEN } from '../constants';
import type { RefreshTokenResponse } from '../types/auth-types';
import { apiRequest } from '../utils/api';
import type {
  ApiResult,
  ChangePasswordParams,
  EditPasswordParams,
  LoginParams,
  LoginResponse,
  OtpParams,
  ResetAdminPasswordParams,
  ResetPasswordParams,
  VerifyAdminParams,
} from '../types/auth-types';

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

function saveRefreshTokens(payload: RefreshTokenResponse) {
  const accessToken = payload.accessToken ?? payload.token;
  const refreshToken = payload.refreshToken;
  const accessExpires =
    payload.accessTokenExpiresAt ?? payload.accessTokenExpiryTime;
  const refreshExpires =
    payload.refreshTokenExpiresAt ?? payload.refreshTokenExpiryTime;

  if (!accessToken || !refreshToken) {
    throw new Error('Refresh token response is missing tokens.');
  }

  setCookieWithOptionalExpiry(TOKEN, accessToken, accessExpires);
  setCookieWithOptionalExpiry(REFRESH_TOKEN, refreshToken, refreshExpires);
}

export async function getCurrentUser<TUser = unknown>() {
  const response = await apiRequest<TUser | ApiResult<TUser>>('Admin/details', {
    method: 'GET',
  });

  return getResult(response);
}

export async function loginApi({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  const response = await apiRequest<LoginResponse | ApiResult<LoginResponse>>(
    'Admin/login',
    {
      method: 'POST',
      skipAuth: true,
      body: {
        emailOrPhone: email,
        password,
      },
    },
  );

  return getResult(response);
}

export async function changePasswordApi(data: ChangePasswordParams) {
  return apiRequest<unknown>('Admins/resetpassword', {
    method: 'POST',
    body: data,
  });
}

export async function refreshTokenApi(): Promise<RefreshTokenResponse> {
  const token = Cookies.get(TOKEN);
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const response = await apiRequest<
    RefreshTokenResponse | ApiResult<RefreshTokenResponse>
  >('auth/refresh-token', {
    method: 'POST',
    body: {
      accessToken: token,
      refreshToken,
    },
  });

  const payload = getResult(response);
  saveRefreshTokens(payload);

  return payload;
}

export async function forgetPasswordApi({ email }: { email: string }) {
  return apiRequest<unknown>(
    `Admin/resend-otp?email=${encodeURIComponent(email)}`,
    {
      method: 'POST',
      skipAuth: true,
    },
  );
}

export async function otpApi({ otp, email }: OtpParams) {
  await apiRequest<unknown>('Admins/validateOtp', {
    method: 'POST',
    skipAuth: true,
    body: { otp, email },
  });

  return { otp, email };
}

export async function resendOtpApi({ email }: { email: string }) {
  return apiRequest<unknown>(
    `Admin/resend-otp?email=${encodeURIComponent(email)}`,
    {
      method: 'POST',
      skipAuth: true,
    },
  );
}

export async function verifyAdminApi({ otp, token }: VerifyAdminParams) {
  return apiRequest<unknown>('Admin/verify-admin-otp-async', {
    method: 'POST',
    skipAuth: true,
    body: { otpCode: otp, token },
  });
}

export async function verifyOtpApi({ otp, email }: OtpParams) {
  return apiRequest<unknown>('Admin/verify-admin-otp-async', {
    method: 'POST',
    skipAuth: true,
    body: { otpCode: otp, email, token: null },
  });
}

export async function resetPasswordApi({
  password,
  email,
  otp,
}: ResetPasswordParams) {
  return apiRequest<unknown>('Admins/forgetPassword', {
    method: 'POST',
    skipAuth: true,
    body: {
      newPassword: password,
      otp,
      email,
    },
  });
}

export async function resetAdminPasswordApi({
  password,
  adminId,
}: ResetAdminPasswordParams) {
  return apiRequest<unknown>('Admin/admin-reset-password', {
    method: 'POST',
    body: {
      newPassword: password,
      confirmPassword: password,
      adminId,
    },
  });
}

export async function editPasswordApi(data: EditPasswordParams) {
  return apiRequest<unknown>('Account/resetpassword', {
    method: 'POST',
    body: data,
  });
}
