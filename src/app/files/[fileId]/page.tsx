import { FC } from 'react';

import { format } from 'date-fns';
import { DownloadIcon } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/app/_components/ui/card';
import { FilePreviewContainer } from '@/app/files/file-preview';
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
                        <h1 className={'text-4xl'}>{data.data.name}</h1>
                    </div>
                    <h2 className={'text-lg text-primary block'}>
                        {data.data.filetype}
                    </h2>
                </div>
                <h2 className="text-lg">
                    {format(data.data.createdAt, 'dd.MM.yyyy')}
                </h2>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <a
                    href={data.data.link}
                    download={data.data.name}
                    target={'_blank'}
                >
                    <FilePreviewContainer className="h-24 w-40 bg-green-200 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500 transition-all grid place-content-center">
                        <DownloadIcon className={'w-12 h-12'} />
                    </FilePreviewContainer>
                </a>
            </CardContent>
        </Card>
    );
};

export default Page;
