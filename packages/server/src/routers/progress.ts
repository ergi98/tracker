import { z } from "zod";
import { router, procedure } from "../trpc";

import { prisma } from "../prisma";
import { type Progress } from "@prisma/client";

const getProgressInput = z.object({
  skip: z.number().positive().default(0),
});

const addProgressInput = z.object({});

export const progressRouter = router({
  get: procedure.input(getProgressInput).query(({ input: { skip } }) => {
    return prisma.progress.aggregate({
      orderBy: {
        date: "desc",
      },
      skip: skip,
      take: 100,
    }) as Promise<Progress[]>;
  }),
  add: procedure.input(addProgressInput).mutation(({ input }) => {}),
});
