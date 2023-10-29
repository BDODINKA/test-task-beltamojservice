export type UserDataType = {
  id: number;
  email: string;
  phone: string;
  status: boolean;
  company: string;
  jobTitle: string;
  lastName: string;
  firstName: string;
  interests: string;
};

export type PaginationDataType = {
  page: number;
  limit: number;
};

export type NewUserType = Omit<UserDataType, "id">;

export type FilterSearchType = {
  field: string;
  value: string | boolean;
};

export type ErrorModalType = {
  message: string;
  openModal: boolean;
};
