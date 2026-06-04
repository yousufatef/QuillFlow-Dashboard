export type ValidationErrorApiResponse = {
  errors: Record<string, string[]>;
  status: number;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiRequestOptions = Omit<RequestInit, 'method' | 'body'> & {
  method?: HttpMethod;
  body?: unknown;
  skipAuth?: boolean;
};

export type ApiErrorResponse =
  | {
      isError?: boolean;
      message?: string;
    }
  | {
      isError?: boolean;
      message?: string;
      status: number;
      errors: Record<string, string[]>;
    };

export type RefreshTokenResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  accessTokenExpiryTime?: string;
  refreshTokenExpiresAt?: string;
  refreshTokenExpiryTime?: string;
};

export type ApiResult<T> = {
  result?: T;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  userId: string;
  email: string;
  phone: string;
  userName: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  roles: string[];
  isVerified: boolean;
  hasPin: boolean;
  message?: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt?: string;
  accessTokenExpiryTime?: string;
  refreshTokenExpiresAt?: string;
  refreshTokenExpiryTime?: string;
  isVerified?: boolean;
};

export type ChangePasswordParams = {
  oldPassword?: string;
  newPassword: string;
  confirmPassword?: string;
};

export type OtpParams = {
  otp: string;
  email: string;
};

export type VerifyAdminParams = {
  otp: string;
  token: string;
};

export type ResetPasswordParams = {
  password: string;
  email: string;
  otp: string;
};

export type ResetAdminPasswordParams = {
  password: string;
  adminId: string;
};

export type EditPasswordParams = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
