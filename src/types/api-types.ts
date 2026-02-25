export type Status = "success" | "error";

export type Meta = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

export type ValidationDetail = {
  field: string;
  error: string;
};

export type ApiErrorDetails = {
  code: string;
  message: string;
  details?: ValidationDetail[];
};

export type ApiSuccess<T> = {
  status: "success";
  data?: T;
  meta?: Meta;
};

export type ApiError = {
  status: "error";
  error: ApiErrorDetails;
};

export type DefaultResponse<T> = ApiSuccess<T> | ApiError;
