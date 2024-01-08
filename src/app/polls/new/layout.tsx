import { FC, ReactNode } from 'react';

import CenterLayout from '@/app/_components/center-layout';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/app/_components/ui/card';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <CenterLayout className={'flex-1'}>
            <Card className="w-96">
                <CardHeader>
                    <CardTitle className={'text-center'}>Create poll</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </CenterLayout>
    );
};

export default Layout;
