import { Session } from 'next-auth';
import { type ZodSchema, z } from 'zod';

import { IApiResponse } from '@/types/response';

// import { updateTokens } from '@/lib/tokens';
// import { updateSession } from '@/lib/update-session';

export async function withWrapped<T extends ZodSchema<unknown>>(
    route: string,
    schema: T,
    session: Session | null,
    fetchOptions?: RequestInit,
): Promise<IApiResponse<z.infer<T>>> {
    try {
        const resp = await fetch(process.env.BACKEND_URL + route, fetchOptions);
        if (!resp.ok) {
            /*if (resp.status === 401) {
                const headers = new Headers(fetchOptions?.headers);

                if (session === null) {
                    console.error(
                        '>>> Got 401 and User is not defined, returning error',
                    );
                    return {
                        success: false,
                        message: JSON.stringify(await resp.json()),
                    };
                }

                if (headers.get('X-Token-Updated')) {
                    console.error(
                        '>>>D>>> Token already updated, returning error',
                    );
                    return {
                        success: false,
                        message: JSON.stringify(await resp.json()),
                    };
                }

                console.log('>>>D>>> Updating tokens');
                const newSession = await updateTokens(session);
                console.log('>>>D>>> Updating session', newSession);
                await updateSession(session);
                const newFetchOptions = {
                    ...fetchOptions,
                    headers: {
                        ...fetchOptions?.headers,
                        Authorization: `Bearer ${session.user.access_token}`,
                        'X-Token-Updated': 'true',
                    },
                };
                return await withWrapped(
                    route,
                    schema,
                    session,
                    newFetchOptions,
                );
            }*/

            return {
                success: false,
                message: JSON.stringify(await resp.json()),
            };
        }

        return {
            success: true,
            data: schema.parse(await resp.json()),
        };
    } catch (e) {
        console.error('>>> Error running wrapped call\n', e);
        return {
            success: false,
            message: JSON.stringify(e),
        };
    }
}
