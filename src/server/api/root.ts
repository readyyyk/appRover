import { authRouter } from '@/server/api/routers/auth';
import { filesRouter } from '@/server/api/routers/files';
import { groupsRouter } from '@/server/api/routers/groups';
import { pollsRouter } from '@/server/api/routers/polls';
import { usersRouter } from '@/server/api/routers/users';
import { createTRPCRouter } from '@/server/api/trpc';

export const appRouter = createTRPCRouter({
    auth: authRouter,
    users: usersRouter,
    polls: pollsRouter,
    files: filesRouter,
    groups: groupsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
