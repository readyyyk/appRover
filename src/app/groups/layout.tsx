import { FC, ReactNode } from 'react';

import CenterLayout from '@/app/_components/center-layout';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="absolute left-1/2 top-0 flex min-h-screen w-[95dvw] max-w-md -translate-x-1/2 items-center">
            <CenterLayout>{children}</CenterLayout>
        </div>
    );
};

export default Layout;
