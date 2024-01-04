'use client';

import { FC, useTransition } from 'react';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

interface Props {}

const SignOutButton: FC<Props> = ({}) => {
    const [isLoading, startLoading] = useTransition();
    const handleClick = () => startLoading(async () => await signOut());

    return (
        <Button variant={'outline'} onClick={handleClick} loading={isLoading}>
            Sign out
        </Button>
    );
};

export default SignOutButton;
