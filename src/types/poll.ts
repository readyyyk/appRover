import { z } from 'zod';

import { UserDataSchema } from '@/types/user';

export const AllPollStates = ['frozen', 'active'] as const;
export const PollStateSchema = z.enum(AllPollStates);

export const PollSchema = z.object({
    id: z.number(),
    title: z.string(),
    fileId: z.number(), // FK
    ownerId: z.number(), // FK
    deadline: z.date(),
    state: PollStateSchema,
    resultUrl: z.string().url().optional(),
    votedFor: z.number(),
    votedAgainst: z.number(),
    votersCount: z.number(),
});

export const PollWithOwnerSchema = PollSchema.extend({
    owner: UserDataSchema,
});

export const PollCreateSchema = PollSchema.pick({
    title: true,
    fileId: true,
    deadline: true,
});

export type IPoll = z.infer<typeof PollSchema>;
export type IPollState = z.infer<typeof PollStateSchema>;
export type IPollCreate = z.infer<typeof PollCreateSchema>;
export type IPollWithOwner = z.infer<typeof PollWithOwnerSchema>;
