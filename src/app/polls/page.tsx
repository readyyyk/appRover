'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { IPollState } from '@/types/poll';

import CenterLayout from '@/app/_components/center-layout';
import { api } from '@/trpc/react';

import PollPreview from './PollPreview';
import SearchBar from './SearchBar';

export default function Page() {
    const [searchValue, setSearchValue] = useState('');
    const [ownerSearchValue, setOwnerSearchValue] = useState('');
    const [deadlineSearchValues, setDeadlineSearchValues] = useState<
        [Date, Date]
    >([new Date(0), new Date()]);
    const [availableStates, setAvailableStates] = useState<IPollState[]>([
        'active',
        'frozen',
    ]);

    const resp = api.polls.getPreviews.useQuery();
    const { data: previews, error, isLoading } = resp;

    if (isLoading) {
        return (
            <CenterLayout>
                <Loader2 className={'animate-spin'} />
            </CenterLayout>
        );
    }

    if (error ?? !previews.success) {
        return (
            <h1 className={'text-red-500 text-3xl'}>
                {error?.message ?? 'Error getting polls'}
            </h1>
        );
    }

    return !previews ? (
        <h1 className={'text-secondary text-3xl'}>Nothing here...</h1>
    ) : (
        <div className="flex justify-center min-h-screen">
            <div className={'flex flex-col w-full md:w-[60dvw] mt-20'}>
                <SearchBar
                    stateSearch={[searchValue, setSearchValue]}
                    stateAvailableStates={[availableStates, setAvailableStates]}
                    stateOwnerSearchValue={[
                        ownerSearchValue,
                        setOwnerSearchValue,
                    ]}
                    stateDeadline={[
                        deadlineSearchValues,
                        setDeadlineSearchValues,
                    ]}
                />
                <div className={'flex flex-col space-y-16 mt-24 mb-10'}>
                    {previews.data
                        .filter((a) =>
                            a.title
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()),
                        )
                        .filter((a) =>
                            a.owner.username
                                .toLowerCase()
                                .includes(ownerSearchValue.toLowerCase()),
                        )
                        .filter((a) => availableStates.includes(a.state))
                        .map((preview) => (
                            <PollPreview
                                key={preview.id}
                                {...preview}
                                deadline={new Date(preview.deadline)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
