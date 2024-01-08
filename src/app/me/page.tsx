import { FC } from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import SignOutButton from '@/app/_components/sign-out-button';
import { Card, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

const Page: FC = async ({}) => {
    const session = await getServerAuthSession();
    if (!session) redirect('/signin');

    const data = await api.users.me.query();
    if (!data.success) return null;

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
        </Card>
    );
};

export default Page;
