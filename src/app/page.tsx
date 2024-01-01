import { FC } from 'react';

import { redirect } from 'next/navigation';

interface Props {}

const Page: FC<Props> = async ({}) => {
    redirect('/polls');
};

export default Page;
