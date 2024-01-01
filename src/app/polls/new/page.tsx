import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Form from '@/app/polls/new/form';

interface Props {}

const Page: FC<Props> = ({}) => {
    return (
        <Card className={'z-20 w-full'}>
            <CardHeader>
                <CardTitle className={'text-center text-4xl'}>
                    New poll
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form />
            </CardContent>
        </Card>
    );
};

export default Page;
