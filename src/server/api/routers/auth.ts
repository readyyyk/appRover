import { TokensSchema } from '@/types/auth';
import { UserLoginSchema } from '@/types/user';

import { withWrapped } from '@/lib/3rd-party-call';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@/server/api/trpc';

export const authRouter = createTRPCRouter({
    login: publicProcedure.input(UserLoginSchema).query(({ input }) => {
        return withWrapped('/auth/login', TokensSchema, null, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
    }),
    // refresh: protectedProcedure.query(({ ctx }) => {
    //     return withWrapped('/auth/refresh', TokensSchema, null, {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Bearer ${ctx.session.user.refresh_token}`,
    //         },
    //     });
    // }),
});
