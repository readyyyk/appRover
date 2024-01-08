import { FC, ReactNode } from 'react';

import { format } from 'date-fns';

import { IFile } from '@/types/file';

import { Card, CardTitle } from '@/app/_components/ui/card';
import { cn } from '@/lib/utils';

export const FilePreviewContainer: FC<{
    children: ReactNode;
    className?: string;
}> = ({ children, className }) => (
    <Card
        className={cn(
            'w-52 bg-secondary rounded-xl h-full shadow-lg hover:shadow-secondary transition-all',
            className,
        )}
    >
        {children}
    </Card>
);

type Props = IFile;
const FilePreview: FC<Props> = ({ name, createdAt }) => {
    return (
        <FilePreviewContainer>
            <div className="flex flex-col text-center gap-6 justify-between h-full p-4">
                <CardTitle className={'break-words'}>{name}</CardTitle>
                <p className={'text-lg text-gray-400'}>
                    {format(new Date(createdAt), 'dd.MM.yyyy')}
                </p>
            </div>
        </FilePreviewContainer>
    );
};

export default FilePreview;
