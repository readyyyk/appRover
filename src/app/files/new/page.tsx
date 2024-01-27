'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { FileIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { _IE } from '@/types/utils';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { allowedFileExtStr } from '@/assets/allowedFileExt';
import { api } from '@/trpc/react';

const Page: FC = ({}) => {
    const router = useRouter();

    const fileInput = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');
    const {
        error: trpcError,
        mutateAsync,
        isLoading,
    } = api.files.create.useMutation();

    const [error, setError] = useState('');
    useEffect(() => {
        if (trpcError) {
            setError(trpcError.message);
        }
    }, [trpcError]);

    const handleFileUpload = async () => {
        if (!fileInput.current) return;
        if (!fileInput.current.files || fileInput.current.files.length === 0) {
            return; // User canceled file selection
        }

        const file = fileInput.current.files[0]!;

        console.log(file.type);

        const res = await mutateAsync({
            name: filename,
            filetype: file.type,
        });

        if (!res.success) {
            setError(res.message);
            return;
        }

        router.push('/files');
    };

    return (
        <form
            className={'grid gap-3'}
            onSubmit={(e) => {
                e.preventDefault();
                void handleFileUpload();
            }}
        >
            {!!error && (
                <p className={'text-center text-red-500 mb-4 break-words'}>
                    {error}
                </p>
            )}
            <Label className="flex gap-2 items-center">
                <FileIcon className="aspect-square h-4/5 w-auto" />
                <Input
                    required
                    type="file"
                    name="file"
                    ref={fileInput}
                    accept={allowedFileExtStr}
                />
            </Label>
            <Label>
                <Input
                    required
                    type="text"
                    value={filename}
                    name="filename"
                    placeholder="Filename"
                    onChange={(e: _IE) => setFilename(e.target.value)}
                />
            </Label>
            <Button type={'submit'} variant={'success'} loading={isLoading}>
                Submit
            </Button>
        </form>
    );
};

export default Page;
