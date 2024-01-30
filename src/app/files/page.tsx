import { FC } from 'react';

import { UploadIcon } from 'lucide-react';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';

import FilePreview, { FilePreviewContainer } from '@/app/files/file-preview';
import { api } from '@/trpc/server';

const Page: FC = async ({}) => {
    unstable_noStore();

    const files = await api.files.my.query();
    if (!files.success) {
        return (
            <h1 className={'text-red-500 text-3xl'}>
                {files.message ?? 'Error getting polls'}
            </h1>
        );
    }

    return (
        <div className="flex-1 max-w-6xl w-[95dvw] flex flex-wrap gap-12 justify-center">
            <Link href={'files/new'}>
                <FilePreviewContainer className="min-h-28 bg-green-200 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500 transition-all grid place-content-center">
                    <UploadIcon className={'w-12 h-12'} />
                </FilePreviewContainer>
            </Link>
            {files.data.files?.map((file) => (
                <Link href={`files/${file.id}`} key={`file-${file.id}`}>
                    <FilePreview {...file} />
                </Link>
            ))}
        </div>
    );
};

export default Page;
