import { FC } from 'react';

import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import { UuidSchema } from '@/types/uuid';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { serverTrpc } from '@/app/_trpc/serverClient';
import CopyButton from '@/components/CopyButton';
import { cn } from '@/lib/utils';

interface Props {
    params: { pollId: string };
}

const Page: FC<Props> = async ({ params: { pollId } }) => {
    if (!UuidSchema.safeParse(pollId).success) notFound();

    const data = await serverTrpc.getPoll({ id: pollId });
    if (!data) notFound();

    const shareLink = 'share link';

    return (
        <Card
            className={cn(
                'max-w-[95dvw] md:max-w-4xl shadow shadow-secondary flex-1',
                data.state === 'frozen' && 'shadow shadow-blue-500',
            )}
        >
            <CardHeader className={'flex-row'}>
                <div className={'space-y-0 flex-1'}>
                    <div className="flex gap-3 items-baseline">
                        <h1 className={'text-4xl'}>{data.title}</h1>
                        <CopyButton text={shareLink} />
                    </div>
                    <h2 className={'text-lg text-primary block'}>
                        by @{data.owner.name}
                    </h2>
                </div>
                <h2 className="text-lg">
                    {format(data.deadline, 'dd.MM.yyyy')}
                </h2>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 justify-normal">
                <div className="grid items-center">
                    <div className="">
                        <div className={'grid grid-cols-2 gap-3 p-4 pt-0'}>
                            <h1 className={'text-center col-span-2 text-3xl'}>
                                Vote:
                            </h1>
                            <Button className={'bg-green-500'}>For</Button>
                            <Button className={'bg-red-500'}>Against</Button>
                        </div>

                        <div
                            className={'grid grid-cols-2 items-baseline w-full'}
                        >
                            <h1 className={'text-2xl'}>Voters count</h1>
                            <h2 className={'text-3xl'}>{data.votersCount}</h2>

                            <h1 className={'text-2xl'}>Voted for</h1>
                            <h2 className={'text-3xl'}>{data.votedFor}</h2>

                            <h1 className={'text-2xl'}>Voted against</h1>
                            <h2 className={'text-3xl'}>{data.votedAgainst}</h2>
                        </div>

                        <Progress
                            className={'bg-gray-700 h-8 mt-8'}
                            value={{
                                [(data.votedFor / data.votersCount) * 100]:
                                    'rgb(34, 197, 94)',
                                [(data.votedAgainst / data.votersCount) * 100]:
                                    'red',
                            }}
                        />
                    </div>
                </div>
                <iframe
                    src={data.documentUrl}
                    className={'w-full aspect-[3/4] rounded'}
                />
            </CardContent>
        </Card>
    );
};

export default Page;
