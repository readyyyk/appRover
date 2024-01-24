import {
    FileCreateSchema,
    FileSchema,
    IFile,
    IFileInfo,
    IFileShort,
} from '@/types/file';
import { IApiResponse } from '@/types/response';

import { withWrapped } from '@/lib/3rd-party-call';
import { createMockFile, createMockFiles, random } from '@/lib/mock';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const filesRouter = createTRPCRouter({
    getById: protectedProcedure
        .input(FileSchema.pick({ id: true }))
        .query(async ({ input, ctx }): Promise<IApiResponse<IFileInfo>> => {
            // return withWrapped(
            //     `/files/${input.id}/info`,
            //     FileSchema,
            //     ctx.session,
            //     {
            //         headers: { Authorization: ctx.session.user.access_token },
            //     },
            // );
            return {
                success: true,
                data: createMockFile({ id: input.id }),
            };
        }),
    my: protectedProcedure.query(
        async ({ ctx }): Promise<IApiResponse<IFile[]>> => {
            // return withWrapped(`/files/my`, z.array(FileSchema), ctx.session, {
            //     headers: {
            //         Authorization: `Bearer ${ctx.session.user.access_token}`,
            //     },
            // });
            return {
                success: true,
                data: createMockFiles({ n: random({ max: 14 }) }),
            };
        },
    ),
    myShort: protectedProcedure.query(
        async ({ ctx }): Promise<IApiResponse<IFileShort[]>> => {
            // return await withWrapped(
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
                data: createMockFiles({ n: random({ max: 14 }) }),
            };
        },
    ),
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
