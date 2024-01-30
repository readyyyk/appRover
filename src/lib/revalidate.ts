'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

const revalidate = (
    type: 'tag' | 'page',
    path: string,
    revType?: 'page' | 'layout',
) => {
    const f = type === 'tag' ? revalidateTag : revalidatePath;

    f(path, revType);
};

export default revalidate;
