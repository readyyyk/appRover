import { z } from 'zod';

import { IFile } from '@/types/file';
import { GroupSchema, IGroup } from '@/types/group';
import { PollSchema } from '@/types/poll';
import { IUserData, UserSchema } from '@/types/user';
import { UuidSchema } from '@/types/uuid';

import { files, groups, polls, users } from '@/assets/mock';
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
    getMyFiles: publicProcedure
        .input(z.object({ accessToken: z.string() }))
        .query(async ({ input }) => {
            return files.filter((a) => true) as IFile[];
        }),
});
export type AppRouter = typeof appRouter;
