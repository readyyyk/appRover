import { z } from 'zod';

export const FileSchema = z.object({
    id: z.number(),
    size: z.number(),
    name: z.string(),
    filetype: z.string(),
    owner_id: z.number(),
    created_at: z.string(),
});

export const FileInfoSchema = FileSchema.extend({ link: z.string() });

export const FileCreateSchema = FileSchema.pick({
    name: true,
    filetype: true,
}).extend({
    file: z.any().refine((v) => {
        console.log(v);
        return v instanceof File;
    }),
});
export const FileCreateResSchema = z.object({
    created_id: z.number(),
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
