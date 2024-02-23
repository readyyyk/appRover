import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { env } from '@/env';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

export const revalidate = 0;

const createContext = async (req: NextRequest) => {
    return createTRPCContext({
        headers: req.headers,
    });
};

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        req,
        endpoint: '/api/trpc',
        router: appRouter,
        createContext: () => createContext(req),
        responseMeta(opts) {
            return {
                headers: {
                    'cache-control': `no-cache`,
                },
            };
        },
        onError:
            env.NODE_ENV === 'development'
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? '<no-path>'}: ${
                              error.message
                          }`,
                      );
                  }
                : undefined,
    });

export { handler as GET, handler as POST };
