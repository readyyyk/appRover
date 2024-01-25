import { z } from 'zod';

export const FileSchema = z.object({
    id: z.number(),
    name: z.string(),
    filetype: z.string(),
    ownerId: z.number(),
    createdAt: z.date(),
});

export const FileInfoSchema = FileSchema.extend({ link: z.string().url() });

export const FileCreateSchema = FileSchema.pick({
    name: true,
    filetype: true,
});

export const FileShortSchema = FileSchema.omit({
    filetype: true,
    createdBy: true,
    createdAt: true,
});

export type IFile = z.infer<typeof FileSchema>;
export type IFileInfo = z.infer<typeof FileInfoSchema>;
export type IFileCreate = z.infer<typeof FileCreateSchema>;
export type IFileShort = z.infer<typeof FileShortSchema>;
