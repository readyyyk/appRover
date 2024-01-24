import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    password: z.string(),
    image: z.string().url(),
});

export const UserLoginSchema = UserSchema.pick({
    username: true,
    password: true,
});

export const UserCreateSchema = UserSchema.omit({ id: true }).merge(
    z.object({ image: z.string().url().optional() }),
);

export const UserDataSchema = UserSchema.omit({ password: true });

export type IUser = z.infer<typeof UserSchema>;
export type IUserData = z.infer<typeof UserDataSchema>;
export type IUserLogin = z.infer<typeof UserLoginSchema>;
export type IUserCreate = z.infer<typeof UserCreateSchema>;
