import type { Path } from "react-hook-form";

export const ErrorCode = {
  UNAUTHORIZED: "UNAUTHORIZED",
  BAD_CREDENTIALS: "BAD_CREDENTIALS",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_INVALID: "TOKEN_INVALID",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  ACCESS_DENIED: "ACCESS_DENIED",
  APPLICATION_ACCESS_DENIED: "APPLICATION_ACCESS_DENIED",
  PRIVATE_PROFILE: "PRIVATE_PROFILE",
  NOT_FOUND: "NOT_FOUND",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  CONFLICT: "CONFLICT",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  REQUEST_TIMEOUT: "REQUEST_TIMEOUT",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface Meta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export type FieldValidationError<T> = {
  field: Path<T>;
  error: string;
};

export type ErrorResponse<T = null> = [T] extends [null | undefined | void]
  ? {
      status: "error";
      error: {
        code: ErrorCodeType;
        message: string;
        details: null;
      };
    }
  : {
      status: "error";
      error: {
        code: ErrorCodeType;
        message: string;
        details: T;
      };
    };

export type SuccessResponse<T = null> = [T] extends [null | undefined | void]
  ? {
      status: "success";
    }
  : T extends readonly unknown[]
    ? {
        status: "success";
        data: T;
        meta: Meta;
      }
    : {
        status: "success";
        data: T;
      };

export type DefaultResponse<T = void, E = null> = SuccessResponse<T> | ErrorResponse<E>;
