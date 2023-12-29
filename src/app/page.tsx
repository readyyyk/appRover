import { FC } from 'react';

import { redirect } from 'next/navigation';

interface Props {}

const Page: FC<Props> = async ({}) => {
    redirect('/dashboard');
};

export default Page;
