import type { searchSchema } from "@/features/search/schemas/search-schema";
import { z } from "zod";

export type SearchRequest = z.infer<typeof searchSchema>;
