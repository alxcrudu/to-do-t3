import { createTRPCRouter } from "~/server/api/trpc";
import { TaskRouter } from "~/server/api/routers/TaskRouter";

export const appRouter = createTRPCRouter({
  TaskRouter,
});

export type AppRouter = typeof appRouter;
