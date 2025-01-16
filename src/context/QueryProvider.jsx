import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../api/client";

export const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
