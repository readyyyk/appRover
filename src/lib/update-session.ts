import { Session } from 'next-auth';
import { getCsrfToken } from 'next-auth/react';

import { getBaseUrl } from '@/trpc/shared';

export const updateSession = async (newSession: Session) => {
    await fetch(`${getBaseUrl()}/api/auth/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            csrfToken: await getCsrfToken(),
            data: newSession,
        }),
    });
};
