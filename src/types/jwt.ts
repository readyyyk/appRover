import { z } from 'zod';

import { UserSchema } from '@/types/user';
import { UuidSchema } from '@/types/uuid';

export const JwtPayloadSchema = z.object({
    subject: UserSchema.pick({ id: true }),
    type: z.enum(['access', 'refresh']),
    exp: z.number(),
    iat: z.number(),
    jti: UuidSchema,
});
