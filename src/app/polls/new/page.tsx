'use client';

import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { _IE } from '@/types/utils';

import { Button } from '@/app/_components/ui/button';
import DatePicker from '@/app/_components/ui/date-picker';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import SelectMyFile from '@/app/polls/new/select-my-file';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';

const Page: FC = ({}) => {
    const router = useRouter();

    const {
        error: trpcError,
        mutateAsync,
        isLoading,
    } = api.polls.create.useMutation();

    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState<Date>();
    const [error, setError] = useState('');
    const [fileId, setFileId] = useState('');

    useEffect(() => {
        setError('');
    }, [deadline]);

    useEffect(() => {
        if (trpcError) {
            setError(trpcError.message);
        }
    }, [trpcError]);

    const handleSubmit = async () => {
        if (!fileId) {
            setError('Select file');
            return;
        }
        if (!deadline) {
            setError('Select deadline');
            return;
        }
        const res = await mutateAsync({
            title: title,
            deadline: deadline,
            documentUrl: fileId, // TODO
        });

        if (!res.success) {
            setError(res.message);
            return;
        }

        router.push('/polls');
    };

    return (
        <form
            className={'grid gap-3'}
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit();
            }}
        >
            {!!error && (
                <p className={'text-center text-red-500 mb-4 break-words'}>
                    {error}
                </p>
            )}
            <Label>
                <Input
                    required
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Poll title"
                    onChange={(e: _IE) => setTitle(e.target.value)}
                />
            </Label>
            <Label>
                <DatePicker
                    className={cn(
                        'w-full',
                        error === 'Select deadline' &&
                            'border-red-500 border-2 text-red-500',
                    )}
                    dataState={[deadline, setDeadline]}
                    disabled={(date) => date < new Date()}
                />
            </Label>
            <SelectMyFile selectState={[fileId, setFileId]} />

            <Button type={'submit'} variant={'success'} loading={isLoading}>
                Submit
            </Button>
        </form>
    );
};

export default Page;
