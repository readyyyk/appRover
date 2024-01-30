import { FC } from 'react';

import { DownloadIcon } from 'lucide-react';

import { FilePreviewContainer } from '@/app/files/file-preview';
import { getServerAuthSession } from '@/server/auth';

interface Props {
    link: string;
    name: string;
}

const DownloadFileButton: FC<Props> = async ({ name, link }) => {
    const session = await getServerAuthSession();
    if (!session) {
        return <h1 className="text-red-500 text-lg"> No session </h1>;
    }

    return (
        <a
            href={
                process.env.BACKEND_URL +
                link +
                '?token=' +
                session.user.access_token
            }
            download={name}
            target={'_blank'}
        >
            <FilePreviewContainer className="h-24 w-40 bg-green-200 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500 transition-all grid place-content-center">
                <DownloadIcon className={'w-12 h-12'} />
            </FilePreviewContainer>
        </a>
    );
};

export default DownloadFileButton;
