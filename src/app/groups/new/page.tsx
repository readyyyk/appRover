'use client';

import { FC, useEffect, useState } from 'react';

import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { _IE } from '@/types/utils';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { api } from '@/trpc/react';

const Page: FC = ({}) => {
    const router = useRouter();

    const [groupName, setGroupName] = useState('');
    const [groupLogo, setGroupLogo] = useState('');

    const {
        error: trpcError,
        mutateAsync,
        isLoading,
    } = api.groups.create.useMutation();

    const [error, setError] = useState('');
    useEffect(() => {
        if (trpcError) {
            setError(trpcError.message);
        }
    }, [trpcError]);

    const handleSubmit = async () => {
        const res = await mutateAsync({
            name: groupName,
            logo: groupLogo,
        });

        if (!res.success) {
            setError(res.message);
            return;
        }

        router.push('/groups');
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
                    value={groupName}
                    name="groupname"
                    placeholder="Group name"
                    onChange={(e: _IE) => setGroupName(e.target.value)}
                />
            </Label>
            <Label className="flex gap-2 items-center">
                <ImageIcon className="aspect-square h-4/5 w-auto" />
                <Input
                    required
                    type="url"
                    value={groupLogo}
                    name="grouplogo"
                    placeholder="Link to logo"
                    onChange={(e: _IE) => setGroupLogo(e.target.value)}
                />
            </Label>

            <Button type={'submit'} variant={'success'} loading={isLoading}>
                Submit
            </Button>
        </form>
    );
};

export default Page;
