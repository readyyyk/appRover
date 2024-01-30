'use client';

import { FC, useEffect, useRef, useState } from 'react';

// import { api } from '@/trpc/react';
import { useMutation } from '@tanstack/react-query';
import { FileIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

import { _IE } from '@/types/utils';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { allowedFileExtStr } from '@/assets/allowedFileExt';
import revalidate from '@/lib/revalidate';

import { tempUpload } from './uploadFunc';

const Page: FC = ({}) => {
    const router = useRouter();
    const session = useSession();

    const fileInput = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');
    const {
        error: trpcError,
        // mutateAsync,
        mutateAsync,
        isLoading,
    } = useMutation(tempUpload);
    // = api.files.create.useMutation();

    const [error, setError] = useState('');
    useEffect(() => {
        if (trpcError) {
            setError(String(trpcError));
        }
    }, [trpcError]);

    const handleFileUpload = async () => {
        if (!fileInput.current) return;
        if (!fileInput.current.files || fileInput.current.files.length === 0) {
            return; // User canceled file selection
        }

        const file = fileInput.current.files[0]!;

        if (file.size > 10000000) {
            setError('File size must be less than 10MB');
            return;
        }

        const formData = new FormData();
        formData.set('file', file);
        formData.set('filename', filename);

        if (!session.data?.user.access_token) {
            return console.log('no token');
        }
        const res = await mutateAsync({
            data: formData,
            token: session.data.user.access_token,
        });

        if (!res.success) {
            setError(res.message);
            return;
        }

        revalidate('page', '/files', 'page');
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
