import { router } from "./trpc";

import { createHTTPServer } from "@trpc/server/adapters/standalone";

// Routers
import { progressRouter } from "./routers/progress";

const PORT = parseInt(process.env.PORT || "8124", 10);

const appRouter = router({
  progress: progressRouter,
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(PORT);

export type AppRouter = typeof appRouter;
