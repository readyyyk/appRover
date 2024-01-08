import { TokensSchema } from '@/types/auth';
import { JwtPayloadSchema } from '@/types/jwt';

export const updateTokens = async (refreshToken: string) => {
    const resp = await fetch(process.env.BACKEND_URL + '/auth/refresh-tokens', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    if (!resp.ok) {
        throw new Error(JSON.stringify(await resp.json()));
    }
    const newTokens = TokensSchema.safeParse(await resp.json());
    if (!newTokens.success) {
        throw new Error(newTokens.error.message);
    }
    return newTokens.data;
};

export const parseToken = (token: string) => {
    const payload = token.split('.')[1];
    if (!payload) throw new Error('No payload');
    return JwtPayloadSchema.parse(JSON.parse(atob(payload)));
};
