import { useEffect } from "react";
import type { FieldValues, UseFormClearErrors } from "react-hook-form";

interface UseFormAutoClearErrorsProps<T extends FieldValues> {
  submitCount: number;
  clearErrors: UseFormClearErrors<T>;
  delay?: number;
}

export function useFormAutoClearErrors<T extends FieldValues>({
  submitCount,
  clearErrors,
  delay = 5000,
}: UseFormAutoClearErrorsProps<T>) {
  useEffect(() => {
    if (submitCount === 0) return;

    const timer = setTimeout(() => {
      clearErrors();
    }, delay);

    return () => clearTimeout(timer);
  }, [submitCount, clearErrors, delay]);
}
