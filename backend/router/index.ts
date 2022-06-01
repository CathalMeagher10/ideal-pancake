import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../db/client";
import superjson from "superjson";
import { postsRouter } from "./posts";

export const appRouter = trpc
  .router()
  .merge("posts.", postsRouter)
  .transformer(superjson);

// export type definition of API
export type AppRouter = typeof appRouter;
