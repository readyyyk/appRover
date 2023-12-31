import { z } from 'zod';

import { GroupSchema } from '@/types/group';
import { UuidSchema } from '@/types/uuid';

export const AllPollStates = ['frozen', 'active'] as const;
export const PollStateSchema = z.enum(AllPollStates);

export const PollSchema = z.object({
    id: UuidSchema,
    title: z.string(),
    documentUrl: z.string().url(),
    ownerId: UuidSchema, // FK
    deadline: z.date(),
    state: PollStateSchema,
    resultUrl: z.string().url().optional(),
    votedFor: z.number(),
    votedAgainst: z.number(),
    votersCount: z.number(),
});

export const PollWithOwnerSchema = PollSchema.extend({
    owner: GroupSchema,
});

export type IPoll = z.infer<typeof PollSchema>;
export type IPollState = z.infer<typeof PollStateSchema>;
export type IPollWithOwner = z.infer<typeof PollWithOwnerSchema>;
