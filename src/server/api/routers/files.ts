import { z } from 'zod';

import {
    FileCreateSchema,
    FileInfoSchema,
    FileSchema,
    IFile,
    IFileInfo,
    IFileShort,
} from '@/types/file';
import { IApiResponse } from '@/types/response';

import { withWrapped } from '@/lib/3rd-party-call';
// import { withWrapped } from '@/lib/3rd-party-call';
import { createMockFile, createMockFiles, random } from '@/lib/mock';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const filesRouter = createTRPCRouter({
    getById: protectedProcedure
        .input(FileSchema.pick({ id: true }))
        .query(async ({ input, ctx }): Promise<IApiResponse<IFileInfo>> => {
            return withWrapped(
                `/files/${input.id}/info`,
                FileInfoSchema,
                ctx.session,
                {
                    headers: {
                        Authorization: `Bearer ${ctx.session.user.access_token}`,
                    },
                },
            );
            // return {
            //     success: true,
            //     data: createMockFile({ id: input.id }),
            // };
        }),
    download: protectedProcedure
        .input(FileSchema.pick({ id: true }))
        .query(async ({ input, ctx }) => {
            return withWrapped(
                `/files/${input.id}/download`,
                FileInfoSchema,
                ctx.session,
                {
                    headers: {
                        Authorization: `Bearer ${ctx.session.user.access_token}`,
                    },
                },
            );
        }),
    my: protectedProcedure.query(async ({ ctx }) => {
        //: Promise<IApiResponse<IFile[]>> => {
        return withWrapped(
            `/files/my`,
            z.object({
                files: z.array(FileInfoSchema).optional(),
            }),
            null,
            {
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                },
            },
        );
        // return {
        //     success: true,
        //     data: createMockFiles({ n: random({ max: 14 }) }),
        // };
    }),
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
        .mutation(async ({ ctx, input }) => {
            throw new Error('Not implemented');
            /*const data = new FormData(input);
            console.log(data);

            for (const value of data?.values()) {
                console.log(value);
            }
            return await withWrapped(`/files/create`, FileSchema, null, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ctx.session.user.access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: data,
            });*/
        }),
});
