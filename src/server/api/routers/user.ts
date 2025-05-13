import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getOne: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;

    if (!userId) {
      throw new Error("User not found");
    }

    return ctx.db.user.findUnique({ where: { id: userId } });
  }),
});
