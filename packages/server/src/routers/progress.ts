import { z } from "zod";
import { router, procedure } from "../trpc";

import { prisma } from "../prisma";

const getProgressInput = z.object({
  skip: z.number().gte(0).default(0),
});

const addProgressInput = z.object({});

export const progressRouter = router({
  graph: procedure.query(() => {
    return prisma.progress.findMany({
      orderBy: {
        date: "desc",
      },
    });
  }),
  add: procedure.input(addProgressInput).mutation(({ input }) => {}),
});
