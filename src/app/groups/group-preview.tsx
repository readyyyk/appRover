import { FC, ReactNode } from 'react';

import Image from 'next/image';

import { IGroup } from '@/types/group';

import { Card } from '@/app/_components/ui/card';
import { cn } from '@/lib/utils';

export const GroupPreviewContainer: FC<{
    children: ReactNode;
    className?: string;
}> = ({ children, className }) => (
    <Card
        className={cn(
            'h-24 max-w-sm bg-secondary rounded-xl shadow-lg hover:shadow-secondary transition-all',
            className,
        )}
    >
        {children}
    </Card>
);

type Props = IGroup;
const GroupPreview: FC<Props> = ({ name, logo }) => {
    return (
        <GroupPreviewContainer>
            <div className={'flex h-full items-center p-4 gap-4'}>
                <Image
                    src={logo}
                    alt={name}
                    width={64}
                    height={64}
                    className="object-cover rounded-full w-[64px] h-[64px]"
                />
                <h1 className={'text-xl font-semibold'}>{name}</h1>
            </div>
        </GroupPreviewContainer>
    );
};

export default GroupPreview;
