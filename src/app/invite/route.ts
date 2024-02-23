import { NextRequest, NextResponse } from 'next/server';

import { default as revalidateP } from '@/lib/revalidate';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

export const revalidate = 0;

export async function GET(req: NextRequest) {
    const session = await getServerAuthSession();
    if (!session) {
        return new NextResponse('', { status: 401 });
    }

    const hash = new URL(req.nextUrl.href).searchParams.get('hash');
    if (!hash) {
        return new NextResponse('No hash was provided', { status: 400 });
    }

    const resp = await api.polls.useInvite.query(hash);

    if (!resp.success) {
        return new NextResponse('Error using invitation', { status: 400 });
    }

    revalidateP('page', `/polls/${resp.data}`, 'page');
    return new NextResponse('', {
        status: 302,
        headers: {
            Location: `/polls/${resp.data}`,
        },
    });
}
