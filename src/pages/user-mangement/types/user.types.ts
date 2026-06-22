export const KycStatus = {
  NONE: 0,
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const;

export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];

export type ActiveStatus = 'active' | 'suspended';

export const toActiveStatus = (isActive: boolean): ActiveStatus =>
  isActive ? 'active' : 'suspended';

export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  kycStatus: KycStatus;
  createdOn: string;
  updatedOn?: string;
};

export type UserTableRow = User & {
  rowNumber: number;
};

export type UsersListData = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  result: User[];
};

export type UsersListResponse = {
  statusCode: number;
  timestamp: string;
  isSuccess: boolean;
  message: string;
  data: UsersListData;
};
