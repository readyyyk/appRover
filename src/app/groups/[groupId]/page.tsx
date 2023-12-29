import { FC } from 'react';

import { notFound } from 'next/navigation';

import { UuidSchema } from '@/types/uuid';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { serverTrpc } from '@/app/_trpc/serverClient';

interface Props {
    params: { groupId: string };
}

const Page: FC<Props> = async ({ params: { groupId } }) => {
    if (!UuidSchema.safeParse(groupId).success) notFound();

    const data = await serverTrpc.getGroupData({ id: groupId });
    if (!data) notFound();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{}</CardTitle>
                <CardContent>
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </CardContent>
            </CardHeader>
        </Card>
    );
};

export default Page;
