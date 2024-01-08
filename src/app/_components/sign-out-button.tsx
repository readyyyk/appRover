'use client';

import { FC, useTransition } from 'react';

import { signOut } from 'next-auth/react';

import { Button } from '@/app/_components/ui/button';

const SignOutButton: FC = ({}) => {
    const [isLoading, startLoading] = useTransition();
    const handleClick = () => startLoading(async () => await signOut());

    return (
        <Button variant={'outline'} onClick={handleClick} loading={isLoading}>
            Sign out
        </Button>
    );
};

export default SignOutButton;
