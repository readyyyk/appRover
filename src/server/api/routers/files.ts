import { z } from 'zod';

import {
    FileCreateSchema,
    FileSchema,
    FileShortSchema,
    IFileShort,
} from '@/types/file';

import { withWrapped } from '@/lib/3rd-party-call';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@/server/api/trpc';

export const filesRouter = createTRPCRouter({
    byId: protectedProcedure
        .input(FileSchema.pick({ id: true }))
        .query(({ input, ctx }) => {
            return withWrapped(
                `/files/${input.id}/info`,
                FileSchema,
                ctx.session,
                {
                    headers: { Authorization: ctx.session.user.access_token },
                },
            );
        }),
    my: protectedProcedure.query(({ ctx }) => {
        return withWrapped(`/files/my`, z.array(FileSchema), ctx.session, {
            headers: {
                Authorization: `Bearer ${ctx.session.user.access_token}`,
            },
        });
    }),
    myShort: protectedProcedure.query(({ ctx }) => {
        // return withWrapped(
        //     `/files/myShort`,
        //     z.array(FileShortSchema),
        //     ctx.session,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${ctx.session.user.access_token}`,
        //         },
        //     },
        // );
        return {
            success: true,
            data: [
                { id: 1, name: '123' },
                { id: 2, name: 'lorem lorem korenm koren asdqwe qwezfc ' },
            ] as IFileShort[],
        };
    }),
    create: protectedProcedure
        .input(FileCreateSchema)
        .mutation(({ ctx, input }) => {
            return withWrapped(`/files/create`, FileSchema, null, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });
        }),
});
