export type IconProps = { className?: string };

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined | (string | number | boolean)[]
>;

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string | null;
  errors: string[] | null;
  statusCode: number;
}

export interface ListApiResponse<T> {
  isSuccess: boolean;
  result: T;
  totalCount?: number;
  pageSize?: number;
  pageNumber?: number;
  message: string | null;
  errors: string[] | null;
  statusCode: number;
}
