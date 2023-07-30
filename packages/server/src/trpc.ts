import { initTRPC } from "@trpc/server";

const { router, procedure, middleware } = initTRPC.create({
  errorFormatter({ shape }) {
    return shape;
  },
});

export { router, procedure, middleware };
