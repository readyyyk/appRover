import { z } from 'zod';

import { UserCreateSchema, UserDataSchema } from '@/types/user';

import { withWrapped } from '@/lib/3rd-party-call';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@/server/api/trpc';

export const usersRouter = createTRPCRouter({
    create: publicProcedure.input(UserCreateSchema).mutation(({ input }) => {
        return withWrapped('/users/create', z.null(), null, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
    }),
    me: protectedProcedure.query(({ ctx }) => {
        return withWrapped('/users/me', UserDataSchema, ctx.session, {
            headers: {
                Authorization: `Bearer ${ctx.session.user.access_token}`,
            },
        });
    }),

    // DANGER !!!
    meManual: publicProcedure.input(z.string()).query(({ input }) => {
        return withWrapped('/users/me', UserDataSchema, null, {
            headers: { Authorization: `Bearer ${input}` },
        });
    }),
});