import { z } from 'zod';

export const TokensSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.literal('bearer'),
});

export const RegisterResponse = TokensSchema.extend({
    user_id: z.number(),
});

export type ITokens = z.infer<typeof TokensSchema>;
