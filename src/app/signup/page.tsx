'use client';

import { FC, useState } from 'react';

import { signIn } from 'next-auth/react';

import AuthForm from '@/app/_components/auth-form';
import { api } from '@/trpc/react';

const Page: FC = ({}) => {
    const { mutateAsync, isLoading } = api.users.create.useMutation();

    const usernameState = useState('');
    const passwordState = useState('');
    const repeatedPasswordState = useState('');
    const errorState = useState('');

    const [username] = usernameState;
    const [password] = passwordState;
    const [repeatedPassword] = repeatedPasswordState;
    const [_, setError] = errorState;

    const handleSubmit = async () => {
        setError('');
        if (!username || !password || !repeatedPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== repeatedPassword) {
            setError('Passwords must be equal!');
            return;
        }

        const resp = await mutateAsync({ username, password });
        if (!resp?.success) {
            console.log(resp?.message);
            setError(resp?.message || 'Error while signing up');
        } else {
            void signIn('credentials', {
                username,
                password,
                callbackUrl: '/',
            });
        }
    };

    return (
        <AuthForm
            type={'signup'}
            {...{
                isLoading,
                handleSubmit,
                usernameState,
                passwordState,
                repeatedPasswordState,
                errorState,
            }}
        />
    );
};

export default Page;
