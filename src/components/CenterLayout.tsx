import {FC, ReactNode} from 'react';
import {cn} from '@/lib/utils';

interface Props {
    children?: ReactNode;
    className?: string;
}
const CenterLayout: FC<Props> = ({children, className}) => {
    return (
        <div
            className={cn(
                'w-full min-h-screen absolute left-0 top-0 flex justify-center items-center',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default CenterLayout;
