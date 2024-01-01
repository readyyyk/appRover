import { z } from 'zod';

import { UuidSchema } from '@/types/uuid';

export const FileSchema = z.object({
    id: UuidSchema,
    createdBy: UuidSchema,
    createdAt: z.date(),
    name: z.string(),
});

export type IFile = z.infer<typeof FileSchema>;
