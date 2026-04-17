import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group";
import type { SearchRequest } from "@/features/search/types/search-types";
import { searchSchema } from "@/features/search/schemas/search-schema";
import { PARAM_NAME } from "@/features/search/constants/contants";
import { Field, FieldError } from "@/shared/components/ui/field";
import type { SetURLSearchParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SearchIcon, X } from "lucide-react";

interface SearchFormProps {
  param: URLSearchParams;
  setParam: SetURLSearchParams;
  isLoading: boolean;
}

export const SearchForm = ({ param, setParam, isLoading }: SearchFormProps) => {
  const search = param.get(PARAM_NAME) ?? "";

  const form = useForm<SearchRequest>({
    resolver: zodResolver(searchSchema),
    mode: "onSubmit",
    values: {
      search: search,
    },
  });

  const handleSearchProfile = ({ search }: SearchRequest) => {
    setParam({ [PARAM_NAME]: search });
  };

  const handleClearSearch = () => {
    setParam({});
  };

  return (
    <form onSubmit={form.handleSubmit(handleSearchProfile)} className="w-full my-1.5">
      <Controller
        name="search"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <InputGroup>
              <InputGroupInput
                {...field}
                disabled={isLoading}
                placeholder="Pesquisar pelo nome de perfil..."
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              {search.length > 0 && (
                <InputGroupAddon align="inline-end">
                  <Button type="button" size="icon-sm" variant="ghost" onClick={handleClearSearch}>
                    <X />
                  </Button>
                </InputGroupAddon>
              )}
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
};
