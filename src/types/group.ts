import { z } from 'zod';

import { UuidSchema } from '@/types/uuid';

export const GroupSchema = z.object({
    id: UuidSchema,
    name: z.string(),
    logo: z.string().url(),
});
export type IGroup = z.infer<typeof GroupSchema>;
