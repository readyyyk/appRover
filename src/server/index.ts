import { z } from 'zod';

import { IUserData, UserSchema } from '@/types/IUser';
import { GroupSchema, IGroup } from '@/types/group';
import { PollSchema } from '@/types/poll';
import { UuidSchema } from '@/types/uuid';

import { groups, polls, users } from '@/assets/mock';
import { publicProcedure, router } from '@/server/trpc';

// for authed-only routes manually passing accessToken for simplicity
export const appRouter = router({
    getHelloWorld: publicProcedure.query(async () => {
        return 'hello world';
    }),
    getPoll: publicProcedure
        .input(z.object({ id: UuidSchema }))
        .query(async ({ input }) => {
            return polls.find((el) => el.id === input.id);
        }),
    getPreviews: publicProcedure
        .input(PollSchema.pick({ ownerId: true }))
        .query(async ({ input }) => {
            return polls.filter((el) => true);
        }),
    getUserData: publicProcedure
        .input(UserSchema.pick({ id: true }))
        .query(async ({ input }) => {
            return users.find((el) => el.id === input.id) as
                | IUserData
                | undefined;
        }),
    getGroupData: publicProcedure
        .input(GroupSchema.pick({ id: true }))
        .query(async ({ input }) => {
            return groups.find((el) => el.id === input.id) as
                | IGroup
                | undefined;
        }),
    getGroupList: publicProcedure
        .input(z.object({ accessToken: z.string() }))
        .query(async ({ input }) => {
            return groups.filter((el) => true) as IGroup[];
        }),
});
export type AppRouter = typeof appRouter;
