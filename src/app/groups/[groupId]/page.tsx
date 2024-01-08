import { FC } from 'react';

import { notFound } from 'next/navigation';

import { UuidSchema } from '@/types/uuid';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/app/_components/ui/card';
import { api } from '@/trpc/server';

interface Props {
    params: { groupId: string };
}

const Page: FC<Props> = async ({ params: { groupId } }) => {
    if (!UuidSchema.safeParse(groupId).success) notFound();

    const data = await api.groups.byId.query({ id: groupId });
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
