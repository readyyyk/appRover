import { FC } from 'react';

import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { serverTrpc } from '@/app/_trpc/serverClient';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SignOutButton from '@/app/me/SignOutButton';

interface Props {}
const Page: FC<Props> = async ({}) => {
    const session = await getServerSession(options);
    if (!session) redirect('/signin');

    // const data = await serverTrpc.users.me();
    // console.log(data);
    // if (!data.success) return null;

    return (
        <Card className={'w-full items-center flex flex-col'}>
            <CardHeader className="flex-row justify-between w-full items-center">
                <CardTitle className={'flex items-center gap-4'}>
                    <div className="w-16 aspect-square rounded-full shadow-lg  p-3 grid place-content-center shadow-secondary">
                        <Image
                            src={session.user.image}
                            alt="profile picture"
                            width={64}
                            height={64}
                            className="w-full"
                        />
                    </div>
                    <span>{session.user.username}</span>
                </CardTitle>
                <SignOutButton />
            </CardHeader>
            {/*<CardContent></CardContent>*/}
        </Card>
    );
};

export default Page;
