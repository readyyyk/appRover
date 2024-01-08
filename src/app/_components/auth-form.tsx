'use client';

/*
 * React-Hook-Form isn't used here because it's not needed.
 * This is a simple form with minimal validation.
 */
import { Dispatch, FC, SetStateAction } from 'react';

import Link from 'next/link';

import { _IE } from '@/types/utils';

import { Button } from '@/app/_components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';

interface SharedProps {
    isLoading: boolean;
    errorState: [string, Dispatch<SetStateAction<string>>];
    usernameState: [string, Dispatch<SetStateAction<string>>];
    passwordState: [string, Dispatch<SetStateAction<string>>];
    handleSubmit: () => Promise<void> | void;
}

interface SignInProps extends SharedProps {
    type: 'signin';
}

interface SignUpProps extends SharedProps {
    type: 'signup';
    repeatedPasswordState: [string, Dispatch<SetStateAction<string>>];
}

type Props = SignInProps | SignUpProps;
const AuthForm: FC<Props> = (props) => {
    const { type } = props;
    const {
        isLoading,
        handleSubmit,
        errorState: [error],
        usernameState: [username, setUsername],
        passwordState: [password, setPassword],
    } = props;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className={'text-center'}>
                    Sign {type === 'signin' ? 'in' : 'up'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <p className={'text-center text-red-500 mb-4 break-words'}>
                        {error}
                    </p>
                )}
                <form
                    className={'grid gap-3'}
                    onSubmit={(e) => {
                        e.preventDefault();
                        void handleSubmit();
                    }}
                >
                    <Label>
                        <Input
                            type={'text'}
                            name={'username'}
                            placeholder={'Username'}
                            value={username}
                            onChange={(e: _IE) => setUsername(e.target.value)}
                        />
                    </Label>
                    <Label>
                        <Input
                            type={'password'}
                            name={'password'}
                            placeholder={'Password'}
                            value={password}
                            onChange={(e: _IE) => setPassword(e.target.value)}
                        />
                    </Label>
                    {type === 'signup' && (
                        <Label>
                            <Input
                                type={'password'}
                                name={'password'}
                                placeholder={'Repeat password'}
                                value={props.repeatedPasswordState[0]}
                                onChange={(e: _IE) =>
                                    props.repeatedPasswordState[1](
                                        e.target.value,
                                    )
                                }
                            />
                        </Label>
                    )}

                    <div className={'flex gap-3'}>
                        <Button
                            type="submit"
                            className="w-fit"
                            loading={isLoading}
                        >
                            Submit
                        </Button>

                        <Link
                            className={'w-fit flex items-center'}
                            href={`/sign${type === 'signin' ? 'up' : 'in'}`}
                        >
                            <Button type={'button'} variant={'outline'}>
                                Sign {type === 'signin' ? 'up' : 'in'}
                            </Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AuthForm;
