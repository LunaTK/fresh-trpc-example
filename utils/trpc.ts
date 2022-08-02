import type { AppRouter } from "../router.ts";
import { createTRPCClient } from "@trpc/client";

export const trpc = createTRPCClient<AppRouter>({
  url: "/api/trpc",
});
