import { FC } from 'react';

import { format } from 'date-fns';

import { Card, CardContent, CardHeader } from '@/app/_components/ui/card';
import DownloadFileButton from '@/app/files/[fileId]/download';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/server';

interface Props {
    params: { fileId: string };
}

const Page: FC<Props> = async ({ params: { fileId } }) => {
    const data = await api.files.getById.query({ id: Number(fileId) });
    if (!data.success) throw new Error(data.message);

    return (
        <Card
            className={cn(
                'max-w-[95dvw] md:max-w-4xl shadow shadow-secondary flex-1 bg-slate-900 w-[40rem]',
            )}
        >
            <CardHeader className={'flex-row gap-8'}>
                <div className={'space-y-0 flex-1'}>
                    <div className="flex gap-3 items-baseline">
                        <h1 className={'text-4xl break-all'}>
                            {data.data.name}
                        </h1>
                    </div>
                    <h2 className="text-lg text-primary block break-all">
                        {data.data.filetype}
                    </h2>
                </div>
                <h2 className="text-lg">
                    {format(data.data.created_at, 'dd.MM.yyyy')}
                </h2>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <DownloadFileButton
                    link={data.data.link}
                    name={data.data.name}
                />
            </CardContent>
        </Card>
    );
};

export default Page;
