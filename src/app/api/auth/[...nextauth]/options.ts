import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { serverTrpc } from '@/app/_trpc/serverClient';

export const options = {
    pages: {
        signIn: '/signin',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (
                    !credentials ||
                    !credentials.username ||
                    !credentials.password
                )
                    return null;

                const tokens = await serverTrpc.auth.login(credentials);
                if (!tokens.success) throw new Error(tokens.message);

                const user = await serverTrpc.users.me(
                    tokens.data.access_token,
                );
                if (!user.success) throw new Error(user.message);

                return {
                    ...tokens.data,
                    id: user.data.id,
                    image: user.data.image,
                    username: user.data.username,
                };
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = {
                    image: user.image,
                    username: user.username,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token,
                    id: user.id as number,
                };
            }
            return token;
        },
        session: ({ session, token }) => {
            token && (session.user = token.user);
            return session;
        },
    },
} satisfies NextAuthOptions;
