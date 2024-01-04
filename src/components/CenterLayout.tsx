import { FC, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Props {
    children?: ReactNode;
    className?: string;
}
const CenterLayout: FC<Props> = ({ children, className }) => {
    return (
        <div
            className={cn('w-full h-full grid place-content-center', className)}
        >
            {children}
        </div>
    );
};

export default CenterLayout;
