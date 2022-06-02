import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../db/client";

export const postsRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.post.findMany();
    },
  })
  .mutation("create-post", {
    input: z.object({ title: z.string(), author: z.string() }),
    async resolve({ input }) {
      // create post
      return await prisma.post.create({
        data: { name: input.title, author: input.author, body: "post body" },
      });
    },
  });
