import { ZodSchema, z } from 'zod';

import { TokensSchema } from '@/types/auth';
import { IFile } from '@/types/file';
import { GroupSchema, IGroup } from '@/types/group';
import { PollSchema } from '@/types/poll';
import { IApiResponse } from '@/types/response';
import {
    type IUserData,
    UserCreateSchema,
    UserDataSchema,
    UserLoginSchema,
    UserSchema,
} from '@/types/user';
import { UuidSchema } from '@/types/uuid';

import { files, groups, polls, users } from '@/assets/mock';
import { publicProcedure, router } from '@/server/trpc';

function withWrapped<T extends ZodSchema<any>>(
    route: string,
    schema: T,
    fetchOptions?: RequestInit,
): Promise<IApiResponse<z.infer<T>>> {
    return new Promise(async (resolve) => {
        try {
            const resp = await fetch(
                process.env.BACKEND_URL + route,
                fetchOptions,
            );
            if (resp.ok) {
                resolve({
                    success: true,
                    data: schema.parse(await resp.json()),
                });
            } else {
                resolve({
                    success: false,
                    message: JSON.stringify(await resp.json()),
                });
            }
        } catch (e) {
            console.error(e);
            resolve({
                success: false,
                message: JSON.stringify(e),
            });
        }
    });
}

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
        .query(async ({ input }): Promise<IFile[]> => {
            return files.filter((a) => true);
        }),
    auth: router({
        login: publicProcedure.input(UserLoginSchema).mutation(({ input }) => {
            return withWrapped('/auth/login', TokensSchema, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });
        }),
    }),
    users: router({
        create: publicProcedure
            .input(UserCreateSchema)
            .mutation(({ input }) => {
                return withWrapped('/users/create', z.null(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(input),
                });
            }),
        me: publicProcedure
            .input(z.string().optional())
            .query(({ input, ctx }) => {
                if (input)
                    return withWrapped('/users/me', UserDataSchema, {
                        headers: { Authorization: `Bearer ${input}` },
                    });
                return withWrapped('/users/me', UserDataSchema);
            }),
    }),
});
export type AppRouter = typeof appRouter;
