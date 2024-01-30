import { type NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { parseToken, updateTokens } from '@/lib/tokens';
import { api } from '@/trpc/server';

export const authOptions: NextAuthOptions = {
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
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const tokens = await api.auth.login.query(credentials);
                if (!tokens.success) throw new Error(tokens.message);

                const user = await api.users.meManual.query(
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
        jwt: async ({ token, user }) => {
            console.log('\n>>> jwt callback');
            if (user) {
                token.user = {
                    image: user.image,
                    username: user.username,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token,
                    id: user.id as number,
                };
            }
            if (
                parseToken(token.user.access_token).exp <=
                new Date().getTime() / 1000
            ) {
                console.log('>>>D>>> Updating tokens');
                const newTokens = await updateTokens(token.user.refresh_token);
                console.log('>>>D>>> New tokens', newTokens);
                token.user.access_token = newTokens.access_token;
                token.user.refresh_token = newTokens.refresh_token;
            }
            return token;
        },
        session: ({ session, token }) => {
            // console.log(
            //     '\nCALLBACK NEXT-AUTH:',
            //     '\nsession: ',
            //     session,
            //     '\ntoken:',
            //     token,
            //     '\nnewSession',
            //     newSession,
            //     '\nuser:',
            //     user,
            // );
            token && (session.user = token.user as User);
            // console.log(
            //     '>>>D>>> Returning session access token\n',
            //     session.user.access_token,
            // );
            return session;
        },
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);
