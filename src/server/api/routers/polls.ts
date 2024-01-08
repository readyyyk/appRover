import { z } from 'zod';

import {
    PollCreateSchema,
    PollSchema,
    PollWithOwnerSchema,
} from '@/types/poll';

import { withWrapped } from '@/lib/3rd-party-call';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const pollsRouter = createTRPCRouter({
    getPreviews: protectedProcedure.query(({ ctx }) => {
        return withWrapped(
            '/polls/my',
            z.array(PollWithOwnerSchema),
            ctx.session,
            {
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                },
            },
        );
    }),
    create: protectedProcedure
        .input(PollCreateSchema)
        .mutation(({ ctx, input }) => {
            return withWrapped('/polls/create', PollSchema, ctx.session, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                },
            });
        }),
});
