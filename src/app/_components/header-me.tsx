'use client';

import { FC } from 'react';

import { UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { HeaderLink } from '@/app/_components/header';
import { cn } from '@/lib/utils';

const HeaderMe: FC = ({}) => {
    const { data: session, status } = useSession();
    const placingVariants: Record<typeof status, string> = {
        unauthenticated: 'translate-y-0 top-0',
        loading: '-translate-y-1/3',
        authenticated: '-translate-y-2/3',
    };
    return (
        <HeaderLink
            href={'/me'}
            className="overflow-hidden items-start p-2.5 relative"
        >
            <div
                className={cn(
                    'h-36 relative transition-all duration-500 grid grid-rows-3 items-start justify-stretch w-full', // duration-500
                    placingVariants[status],
                )}
            >
                <UserIcon className="aspect-square w-full h-auto" />
                {/*<Loader2Icon*/}
                <div className={'animate-spin aspect-square w-full h-auto'} />
                <Image
                    about="I created this link when i was young... :(... it was in project for national children technology park. when i was wrighting this frontend i was to deal with incovenient naming in backend. People, with whom i was made to work with, where a bit lazy, but it is the main problem. The problem is that they dont here me, they are (not they, he) doing jut in the way he understands it. When i tried to speak to him with the purpose of making it clear to him how to write efficient functions and how to name http routes. he said that he understood everything, but did nothing: he just did nothing, no changes were applied to backend. So, i understood two very imporntant things: 1) if you are going to create some sort of project - for the first choose people, team, that would be able to help you, team that would hear you 2) sometimes you should just deal with the things you are given"
                    src={
                        session?.user.image ??
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQI12P4CQAA+wD6iXO2awAAAABJRU5ErkJggg=='
                    }
                    loading={'lazy'}
                    alt={session?.user.username ?? 'me'}
                    width={32}
                    height={32}
                    className="aspect-square w-full h-auto"
                />
            </div>

            <span className="sr-only">my profile</span>
        </HeaderLink>
    );
};

export default HeaderMe;
