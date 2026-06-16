import type {
  ApiResult,
  ChangePasswordParams,
  LoginParams,
  LoginResponse,
  OtpParams,
  ResetAdminPasswordParams,
} from '../types/auth.types';
import { apiRequest } from '@/utils/api';

function getResult<T>(response: T | ApiResult<T>): T {
  return 'result' in Object(response) ? ((response as ApiResult<T>).result as T) : (response as T);
}

export async function getUserDetails<TUser = unknown>() {
  const response = await apiRequest<TUser | ApiResult<TUser>>('/users/profile', {
    method: 'GET',
  });

  return getResult(response);
}

// ------------------------ LOGIN API ------------------------
export async function loginApi({ email, password }: LoginParams): Promise<LoginResponse> {
  const response = await apiRequest<LoginResponse | ApiResult<LoginResponse>>(
    'auth/login-admin',

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
      newPassword: password,
      confirmNewPassword: password,
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

