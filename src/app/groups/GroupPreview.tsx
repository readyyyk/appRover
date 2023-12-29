import { FC, ReactNode } from 'react';

import Image from 'next/image';

import { IGroup } from '@/types/group';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

export const GroupPreviewContainer: FC<{
    children: ReactNode;
    className?: string;
}> = ({ children, className }) => (
    <Card
        className={cn(
            'aspect-square w-52 bg-secondary rounded-xl h-full shadow-lg hover:shadow-secondary transition-all',
            className,
        )}
    >
        {children}
    </Card>
);

interface Props extends IGroup {}
const GroupPreview: FC<Props> = ({ id, name, logo }) => {
    return (
        <GroupPreviewContainer>
            <CardHeader className={'text-center gap-6'}>
                <CardTitle className={'break-words'}>{name}</CardTitle>
                <Image
                    src={logo}
                    alt={name}
                    width={128}
                    height={128}
                    className={'w-full h-full object-cover rounded-full'}
                />
            </CardHeader>
        </GroupPreviewContainer>
    );
};

export default GroupPreview;
