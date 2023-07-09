import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const router = t.router;
const publicProceducre = t.procedure;

const posts = [{ name: "first post" }];

export const appRouter = router({
  hello: publicProceducre.query(() => "world"),
  "post.get": publicProceducre.query(() => posts),
  "post.create": publicProceducre
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
      posts.push(input);
      return input;
    }),
});

export type AppRouter = typeof appRouter;
