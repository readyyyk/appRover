import { z } from 'zod';

import { FileInfoSchema, FileSchema } from '@/types/file';
import { UserDataSchema } from '@/types/user';

export const AllPollStates = ['frozen', 'active'] as const;
export const PollStateSchema = z.enum(AllPollStates);

export const PollSchema = z.object({
    id: z.number(),
    title: z.string(),
    file_id: z.number(), // FK
    owner_id: z.number(), // FK
    deadline: z.string(),
    state: PollStateSchema,
    // result_url: z.string().url().optional().nullable(),
    voted_for: z.number(),
    voted_against: z.number(),
    voter_count: z.number(),
});

export const PollWithOwnerSchema = PollSchema.extend({
    owner: UserDataSchema,
});

export const PollExtSchema = PollSchema.omit({
    file_id: true,
    owner_id: true,
}).extend({
    owner: UserDataSchema,
    file: FileInfoSchema,
});

export const PollCreateSchema = PollSchema.pick({
    title: true,
    file_id: true,
    deadline: true,
});

export const CreateResponseSchema = z.object({
    created_id: z.number(),
});

export type IPoll = z.infer<typeof PollSchema>;
export type IPollExt = z.infer<typeof PollExtSchema>;
export type IPollState = z.infer<typeof PollStateSchema>;
export type IPollCreate = z.infer<typeof PollCreateSchema>;
export type IPollWithOwner = z.infer<typeof PollWithOwnerSchema>;
