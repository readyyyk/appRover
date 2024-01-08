import { z } from 'zod';

import { UuidSchema } from '@/types/uuid';

export const GroupSchema = z.object({
    id: UuidSchema,
    name: z.string(),
    logo: z.string().url(),
});

export const GroupCreateSchema = GroupSchema.omit({ id: true }).merge(
    z.object({
        logo: z.string().url().optional(),
    }),
);

export type IGroup = z.infer<typeof GroupSchema>;
export type IGroupCreate = z.infer<typeof GroupCreateSchema>;
