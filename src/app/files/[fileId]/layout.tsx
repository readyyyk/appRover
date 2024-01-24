import { FC, ReactNode } from 'react';

import CenterLayout from '@/app/_components/center-layout';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className={'h-screen'}>
            <CenterLayout>{children}</CenterLayout>
        </div>
    );
};

export default Layout;
