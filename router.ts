import { router } from "@trpc/server";
import { z } from "zod";

const posts = [{ name: "first post" }];

export const appRouter = router().query("hello", {
  resolve() {
    return "world";
  },
}).query("post.get", {
  resolve() {
    return posts;
  },
}).mutation("post.create", {
  input: z.object({
    name: z.string(),
  }),
  resolve({ input }) {
    posts.push(input);
    return input;
  },
});

export type AppRouter = typeof appRouter;
