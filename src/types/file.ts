import { z } from 'zod';

import { UuidSchema } from '@/types/uuid';

export const FileSchema = z.object({
    id: z.number(),
    name: z.string(),
    filetype: z.string(),
    createdBy: UuidSchema,
    createdAt: z.date(),
});

export const FileCreateSchema = FileSchema.omit({
    id: true,
    createdBy: true,
    createdAt: true,
});

export const FileShortSchema = FileSchema.omit({
    filetype: true,
    createdBy: true,
    createdAt: true,
});

export type IFile = z.infer<typeof FileSchema>;
export type IFileCreate = z.infer<typeof FileCreateSchema>;
export type IFileShort = z.infer<typeof FileShortSchema>;
