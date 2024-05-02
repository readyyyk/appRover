import { FC } from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { IPollWithOwner } from '@/types/poll';

import { Button } from '@/app/_components/ui/button';
import { Progress } from '@/app/_components/ui/progress';
import { cn } from '@/lib/utils';

type Props = Omit<Omit<IPollWithOwner, 'owner_id'>, 'file_id'>;
const PollPreview: FC<Props> = ({
    id,
    state,
    title,
    owner,
    deadline,
    voter_count,
    voted_for,
    voted_against,
}) => {
    return (
        <div
            className={cn(
                'h-36 bg-secondary w-full rounded-xl shadow-inner shadow-white dark:shadow-black',
                state === 'frozen' && 'border-l-8 border-blue-700',
            )}
        >
            <div className={'grid grid-cols-3 h-full relative'}>
                <div className={'p-6 flex flex-col justify-between'}>
                    <h1 className={'text-2xl line-clamp-2'}>{title}</h1>
                    <a
                        href={`/users/${encodeURIComponent(owner.username)}`}
                        className={'text-gray-500'}
                    >
                        <h2 className={'line-clamp-2'}>@{owner.username}</h2>
                    </a>
                </div>
                <div
                    className="col-span-2 flex flex-col items-end justify-center" //absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                >
                    <h3 className={'text-end text-lg pt-2 pe-3'}>
                        {format(deadline, 'dd.MM.yyyy')}
                    </h3>
                    <Link
                        href={'/polls/' + id}
                        className={'w-28 place-self-center'}
                    >
                        <Button
                            variant={state === 'frozen' ? 'default' : 'success'}
                        >
                            {state === 'frozen' ? 'Result' : 'Vote'}
                        </Button>
                    </Link>
                    <div className={'w-full p-3 flex items-baseline gap-3'}>
                        <h2 className={'text-md mb-1 text-center'}>
                            Progress:
                        </h2>
                        <Progress
                            className={'bg-gray-700'}
                            value={{
                                'rgb(34, 197, 94)':
                                    (voted_for / voter_count) * 100,
                                red: (voted_against / voter_count) * 100,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PollPreview;
