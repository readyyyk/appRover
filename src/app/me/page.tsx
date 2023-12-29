import { FC } from 'react';

import { getServerSession } from 'next-auth';
import Error from 'next/error';
import { notFound, redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { serverTrpc } from '@/app/_trpc/serverClient';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SignOutButton from '@/app/me/SignOutButton';

interface Props {}
const Page: FC<Props> = async ({}) => {
    const session = await getServerSession(options);
    if (!session) redirect('/signin');

    const data = await serverTrpc.getUserData({
        id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
    });
    if (!data) notFound();

    return (
        <Card className={'w-full items-center flex flex-col'}>
            <CardHeader>
                <CardTitle>
                    {data.firstname} {data.lastname}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <pre>{JSON.stringify(data, null, 4)}</pre>
                <SignOutButton />
            </CardContent>
        </Card>
    );
};

export default Page;
