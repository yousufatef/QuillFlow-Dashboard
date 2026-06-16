export const KycStatus = {
  PENDING: 0,
  VERIFIED: 1,
  REJECTED: 2,
} as const;

export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];

export type ActiveStatus = 'active' | 'suspended';

export const toActiveStatus = (isActive: boolean): ActiveStatus => (isActive ? 'active' : 'suspended');

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
  isError: boolean;
  message: string;
  result: UsersListData;
};
