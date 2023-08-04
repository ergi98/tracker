import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@tracker-monorepo/server/src";

export const trpc = createTRPCReact<AppRouter>();
