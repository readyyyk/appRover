import { FC } from 'react';

import { format } from 'date-fns';
import { ArrowDown, ArrowUp, Snowflake } from 'lucide-react';

import CopyButton from '@/app/_components/copy-button';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card';
import { Progress } from '@/app/_components/ui/progress';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/server';

interface Props {
    params: { pollId: string };
}

const Page: FC<Props> = async ({ params: { pollId } }) => {
    const data = await api.polls.getById.query({ id: Number(pollId) });
    if (!data.success) throw new Error(data.message);

    const shareLink = 'share link';

    return (
        <Card
            className={cn(
                'max-w-[95dvw] md:max-w-4xl shadow shadow-secondary flex-1 bg-slate-900',
                data.data.state === 'frozen' && 'shadow shadow-blue-500',
            )}
        >
            <CardHeader className={'flex-row'}>
                <div className={'space-y-0 flex-1'}>
                    <div className="flex gap-3 items-baseline">
                        <h1 className={'text-4xl'}>{data.data.title}</h1>
                        <CopyButton text={shareLink} />
                    </div>
                    <h2 className={'text-lg text-primary block'}>
                        by @{data.data.owner.username}
                    </h2>
                </div>
                <h2 className="text-lg">
                    {format(data.data.deadline, 'dd.MM.yyyy')}
                </h2>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 justify-normal">
                <div className="grid items-center">
                    <div className="">
                        {data.data.state === 'active' ? (
                            <div className={'grid grid-cols-2 gap-3 p-4 pt-0'}>
                                <h1
                                    className={
                                        'text-center col-span-2 text-3xl'
                                    }
                                >
                                    Vote:
                                </h1>
                                <Button className={'bg-green-500'}>
                                    For <ArrowUp className={'h-5'} />
                                </Button>
                                <Button className={'bg-red-500'}>
                                    Against <ArrowDown className={'h-5'} />
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full mb-4 text-blue-500 flex items-center text-2xl gap-2 justify-center">
                                <Snowflake className={'h-10 w-auto'} />
                                Finished
                            </div>
                        )}

                        <div
                            className={'grid grid-cols-3 items-baseline w-full'}
                        >
                            <h1 className={'text-2xl col-span-2'}>
                                Voters count
                            </h1>
                            <h2 className={'text-3xl'}>
                                {data.data.votersCount}
                            </h2>

                            <h1 className={'text-2xl col-span-2'}>Voted for</h1>
                            <h2 className={'text-3xl'}>{data.data.votedFor}</h2>

                            <h1 className={'text-2xl col-span-2'}>
                                Voted against
                            </h1>
                            <h2 className={'text-3xl'}>
                                {data.data.votedAgainst}
                            </h2>
                        </div>

                        <Progress
                            className={'bg-gray-700 h-8 mt-8'}
                            value={{
                                [(data.data.votedFor / data.data.votersCount) *
                                100]: 'rgb(34, 197, 94)',
                                [(data.data.votedAgainst /
                                    data.data.votersCount) *
                                100]: 'red',
                            }}
                        />
                    </div>
                </div>
                <iframe
                    src={data.data.documentUrl}
                    className={'w-full aspect-[3/4] rounded'}
                />
            </CardContent>
        </Card>
    );
};

export default Page;
