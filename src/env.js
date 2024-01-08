import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
        BACKEND_URL: z.string().url(),
        NEXTAUTH_SECRET:
            process.env.NODE_ENV === 'production'
                ? z.string()
                : z.string().optional(),
        NEXTAUTH_URL: z.preprocess(
            (str) => process.env.VERCEL_URL ?? str,
            process.env.VERCEL ? z.string() : z.string().url(),
        ),
    },

    /* NEXT_PUBLIC_ */
    client: {
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
    },

    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        BACKEND_URL: process.env.BACKEND_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
