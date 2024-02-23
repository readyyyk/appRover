'use client';

import { FC } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';

import { Button } from '@/app/_components/ui/button';
import revalidate from '@/lib/revalidate';
import { api } from '@/trpc/react';

interface Props {
    poll_id: number;
    my_vote: boolean | null;
}

const VoteButtons: FC<Props> = ({ poll_id, my_vote }) => {
    const utils = api.useUtils();
    const handleClick = async (isFor: boolean) => {
        await utils.polls.vote.fetch({
            isFor: isFor,
            pollId: poll_id,
        });
        revalidate('page', `/polls/${poll_id}`, 'page');
    };
    return (
        <div className={'grid grid-cols-2 gap-3 p-4 pt-0'}>
            <h1 className="text-center col-span-2 text-3xl">Vote:</h1>
            <Button
                onClick={() => handleClick(true)}
                className={my_vote === true ? 'bg-green-500' : 'bg-gray-500'}
            >
                For <ArrowUp className="h-5" />
            </Button>
            <Button
                onClick={() => handleClick(false)}
                className={my_vote === false ? 'bg-red-500' : 'bg-gray-500'}
            >
                Against <ArrowDown className="h-5" />
            </Button>
        </div>
    );
};

export default VoteButtons;
