import type { ValidationDetail } from "@/types/api-types";

export class ApiException extends Error {
  code: string;
  details?: ValidationDetail[];

  constructor(message: string, code: string, details?: ValidationDetail[]) {
    super(message);
    this.code = code;
    this.details = details;
  }
}
