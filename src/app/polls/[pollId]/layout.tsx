import { FC, ReactNode } from 'react';

import CenterLayout from '@/components/CenterLayout';

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return <CenterLayout>{children}</CenterLayout>;
};

export default Layout;
