'use client';

import { FC, useState, useTransition } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { trpc } from '@/app/_trpc/trpc';
import AuthForm from '@/components/AuthForm';

interface Props {}

const Page: FC<Props> = ({}) => {
    const router = useRouter();

    const usernameState = useState('');
    const passwordState = useState('');
    const errorState = useState('');
    const [isLoading, startLoading] = useTransition();

    const [username] = usernameState;
    const [password] = passwordState;
    const [_, setError] = errorState;

    const handleSubmit = () =>
        startLoading(async () => {
            setError('');
            if (!username || !password) {
                setError('All fields are required');
                return;
            }
            const resp = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });
            if (!resp) {
                setError('Error while signing in');
                return;
            }
            if (resp?.error) {
                setError(resp.error);
                return;
            }
            location.replace('/');
        });

    return (
        <AuthForm
            type={'signin'}
            {...{
                isLoading,
                handleSubmit,
                passwordState,
                usernameState,
                errorState,
            }}
        />
    );
};

export default Page;
