import { FC } from 'react';

import { UploadIcon } from 'lucide-react';
import Link from 'next/link';

import { serverTrpc } from '@/app/_trpc/serverClient';
import FilePreview, { FilePreviewContainer } from '@/app/files/FilePreview';

interface Props {}

const Page: FC<Props> = async ({}) => {
    const files = await serverTrpc.getMyFiles({ accessToken: '' });
    return (
        <div className="flex-1 max-w-6xl w-[95dvw] flex flex-wrap gap-12 justify-center">
            <Link href={'files/new'}>
                <FilePreviewContainer className="bg-green-200 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500 transition-all grid place-content-center">
                    <UploadIcon className={'w-12 h-12'} />
                </FilePreviewContainer>
            </Link>
            {files.map((file) => (
                <Link href={`files/${file.id}`} key={`file-${file.id}`}>
                    <FilePreview {...file} />
                </Link>
            ))}
        </div>
    );
};

export default Page;
