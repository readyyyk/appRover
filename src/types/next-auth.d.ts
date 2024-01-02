import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            image: string;
            username: string;
            access_token: string;
            refresh_token: string;
        };
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
