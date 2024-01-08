import { z } from 'zod';

export const TokensSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
});

export type ITokens = z.infer<typeof TokensSchema>;
