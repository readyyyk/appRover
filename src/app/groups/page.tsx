import { FC } from 'react';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import GroupPreview, {
    GroupPreviewContainer,
} from '@/app/groups/group-preview';
import { api } from '@/trpc/server';

const Page: FC = async ({}) => {
    const groups = await api.groups.my.query();
    if (!groups.success) {
        return (
            <h1 className={'text-red-500 text-3xl'}>
                {groups.message ?? 'Error getting polls'}
            </h1>
        );
    }

    return (
        <div className="flex-1 max-w-6xl w-[95dvw] flex flex-wrap gap-6 justify-center">
            <Link href={'groups/new'}>
                <GroupPreviewContainer className="aspect-video bg-green-200 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500 transition-all grid place-content-center">
                    <PlusIcon className={'w-16 h-16'} />
                </GroupPreviewContainer>
            </Link>
            {groups.data.map((group) => (
                <Link href={`groups/${group.id}`} key={`group-${group.id}`}>
                    <GroupPreview {...group} />
                </Link>
            ))}
        </div>
    );
};

export default Page;
