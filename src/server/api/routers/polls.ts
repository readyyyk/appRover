import { z } from 'zod';

import { IPollWithOwner, PollCreateSchema, PollSchema } from '@/types/poll';
import { IApiResponse } from '@/types/response';

import { withWrapped } from '@/lib/3rd-party-call';
import { createMockPoll, createMockPolls } from '@/lib/mock';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const pollsRouter = createTRPCRouter({
    getPreviews: protectedProcedure.query(
        async ({ ctx }): Promise<IApiResponse<IPollWithOwner[]>> => {
            return { success: true, data: createMockPolls({ n: 4 }) };
            // return await withWrapped(
            //     '/polls/my',
            //     z.array(PollWithOwnerSchema),
            //     ctx.session,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${ctx.session.user.access_token}`,
            //         },
            //     },
            // );
        },
    ),
    getById: protectedProcedure
        .input(PollSchema.pick({ id: true }))
        .query(
            async ({ ctx, input }): Promise<IApiResponse<IPollWithOwner>> => {
                // return await withWrapped(
                //     `/polls/${input.id}`,
                //     PollWithOwnerSchema,
                //     ctx.session,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${ctx.session.user.access_token}`,
                //         },
                //     },
                // );
                return {
                    success: true,
                    data: createMockPoll({ id: input.id }),
                };
            },
        ),
    getCreatedByMe: protectedProcedure.query(async ({ ctx }) => {
        return await withWrapped(
            '/polls/created_by_me',
            z.array(PollSchema),
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
            return withWrapped('/polls/create', z.boolean(), ctx.session, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                },
            });
        }),
});
