import { z } from 'zod';

import { GroupCreateSchema, GroupSchema } from '@/types/group';

import { withWrapped } from '@/lib/3rd-party-call';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@/server/api/trpc';

export const groupsRouter = createTRPCRouter({
    byId: publicProcedure
        .input(GroupSchema.pick({ id: true }))
        .query(({ input }) => {
            return withWrapped(`/groups/${input.id}/info`, GroupSchema, null);
        }),
    my: protectedProcedure.query(({ ctx }) => {
        return withWrapped(`/groups/my`, z.array(GroupSchema), null, {
            headers: {
                Authorization: `Bearer ${ctx.session.user.access_token}`,
            },
        });
    }),
    create: protectedProcedure
        .input(GroupCreateSchema)
        .mutation(({ ctx, input }) => {
            return withWrapped(`/groups/my`, GroupSchema, null, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });
        }),
});
