import { FC, ReactNode } from 'react';

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
        <Card className="w-96">
            <CardHeader>
                <CardTitle className={'text-center'}>Create group</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default Layout;
