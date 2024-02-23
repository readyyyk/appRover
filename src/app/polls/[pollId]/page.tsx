import { FC } from 'react';

import { format } from 'date-fns';
import { LinkIcon, Snowflake } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card';
import { Progress } from '@/app/_components/ui/progress';
import DownloadFileButton from '@/app/files/[fileId]/download';
import InviteDialog from '@/app/polls/[pollId]/invite';
import VoteButtons from '@/app/polls/[pollId]/vote';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/server';

interface Props {
    params: { pollId: string };
}

const Page: FC<Props> = async ({ params: { pollId } }) => {
    const pollData = await api.polls.getById.query({ id: Number(pollId) });
    if (!pollData.success) throw new Error(pollData.message);

    const fileData = pollData.data.file;

    return (
        <Card
            className={cn(
                'max-w-[95dvw] md:max-w-4xl w-[40rem] shadow shadow-secondary flex-1 bg-slate-900',
                pollData.data.state === 'frozen' && 'shadow shadow-blue-500',
            )}
        >
            <CardHeader className={'flex-row'}>
                <div className={'space-y-0 flex-1'}>
                    <div className="flex gap-3 items-baseline">
                        <h1 className={'text-4xl'}>{pollData.data.title}</h1>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="icon" variant="outline">
                                    <LinkIcon />
                                </Button>
                            </AlertDialogTrigger>
                            <InviteDialog poll_id={pollData.data.id} />
                        </AlertDialog>
                    </div>
                    <h2 className={'text-lg text-primary block'}>
                        by @{pollData.data.owner.username}
                    </h2>
                </div>
                <h2 className="text-lg">
                    {format(pollData.data.deadline, 'dd.MM.yyyy')}
                </h2>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 justify-normal mt-8">
                <div className="grid items-center">
                    <div className="">
                        {pollData.data.state === 'active' ? (
                            <VoteButtons
                                poll_id={pollData.data.id}
                                my_vote={pollData.data.my_vote}
                            />
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
                                {pollData.data.voter_count}
                            </h2>

                            <h1 className={'text-2xl col-span-2'}>Voted for</h1>
                            <h2 className={'text-3xl'}>
                                {pollData.data.voted_for}
                            </h2>

                            <h1 className={'text-2xl col-span-2'}>
                                Voted against
                            </h1>
                            <h2 className={'text-3xl'}>
                                {pollData.data.voted_against}
                            </h2>
                        </div>

                        <Progress
                            className={'bg-gray-700 h-8 mt-8'}
                            value={{
                                [(pollData.data.voted_for /
                                    pollData.data.voter_count) *
                                100]: 'rgb(34, 197, 94)',
                                [(pollData.data.voted_against /
                                    pollData.data.voter_count) *
                                100]: 'red',
                            }}
                        />
                    </div>
                </div>

                <div className="w-full rounded flex flex-col items-center justify-center">
                    <h2 className="text-3xl text-center break-all">
                        {fileData.name}
                    </h2>
                    <h3 className="text-primary text-lg break-all">
                        {fileData.filetype}
                    </h3>
                    <DownloadFileButton
                        link={fileData.link}
                        name={fileData.name}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default Page;
