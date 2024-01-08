import type { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: number;
            image: string;
            username: string;
            access_token: string;
            refresh_token: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: number;
        image: string;
        username: string;
        access_token: string;
        refresh_token: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: {
            id: number;
            image: string;
            username: string;
            access_token: string;
            refresh_token: string;
        };
    }
}
