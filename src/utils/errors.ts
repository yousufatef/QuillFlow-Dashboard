import type { ValidationErrorApiResponse } from '../types/auth-types';

export const concatErrors = (res: ValidationErrorApiResponse) => {
  return Object.values(res.errors).flat().join('\r\n');
};
