import type { Path } from "react-hook-form";

export const ErrorCode = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  ACCESS_DENIED: "ACCESS_DENIED",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  CONFLICT: "CONFLICT",
  PRIVATE_PROFILE: "PRIVATE_PROFILE",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface Meta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export type ValidationError<T> = {
  field: Path<T>;
  error: string;
};

export type ErrorPayload<T = unknown> =
  | {
      code: typeof ErrorCode.VALIDATION_ERROR;
      message: string;
      details: ValidationError<T>[];
    }
  | {
      code: Exclude<ErrorCodeType, typeof ErrorCode.VALIDATION_ERROR>;
      message: string;
      details: null;
    };

export type ErrorResponse<T = unknown> = {
  status: "error";
  error: ErrorPayload<T>;
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

export type DefaultResponse<T = void, E = unknown> = SuccessResponse<T> | ErrorResponse<E>;
