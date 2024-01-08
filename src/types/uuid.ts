import { z } from 'zod';

export const UuidSchema = z.string().refine((uuid) => {
    return (
        uuid.match(
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ) !== null
    );
});
export type Uuid = z.infer<typeof UuidSchema>;
