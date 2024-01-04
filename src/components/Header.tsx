'use client';

import { FC, ReactNode } from 'react';

import { FileIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/approver.png';
import { cn } from '@/lib/utils';

interface HeaderLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
}

const HeaderLink: FC<HeaderLinkProps> = ({ href, className, children }) => {
    const title = href.replace('/', '');
    return (
        <Link
            title={title || 'home'}
            href={href}
            className={cn(
                'rounded-full bg-background aspect-square w-auto h-full md:w-full md:h-auto grid place-items-center p-1 shadow shadow-transparent hover:shadow-white transition',
                className,
            )}
        >
            {children}
        </Link>
    );
};

interface Props {}

const Header: FC<Props> = ({}) => {
    const { data: session } = useSession();

    const general =
        'fixed bg-secondary rounded-full p-2 flex shadow-slate-900 hover:shadow-slate-800 transition-all' as const;
    const mobile =
        'h-16 w-[90dvw] bottom-3 left-1/2 -translate-x-1/2 -translate-y-0 flex-row justify-between shadow-[0_0_30px_2px_slate]' as const;
    const desktop =
        'md:w-16 md:h-[50dvh] md:top-1/2  md:left-4 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:justify-between md:shadow-lg' as const;
    return (
        <div className={cn(general, mobile, desktop)}>
            <HeaderLink href={'/'} className="overflow-hidden">
                <Image
                    src={Logo}
                    alt={'AppRover'}
                    className="relative top-1 opacity-70 hover:opacity-100 hover:top-0.5 transition-all"
                    loading={'lazy'}
                />
            </HeaderLink>

            <div className={'flex    flex-row md:flex-col gap-2'}>
                <HeaderLink href={'/groups'}>
                    <UsersIcon />
                    <span className={'sr-only'}>my groups</span>
                </HeaderLink>
                <HeaderLink href={'/files'}>
                    <FileIcon />
                    <span className={'sr-only'}>my files</span>
                </HeaderLink>
            </div>

            <HeaderLink href={'/me'} className={'p-2.5'}>
                {!session ? (
                    <UserIcon />
                ) : (
                    <Image
                        about="I created this link when i wa young... :(... it was in project for national children technology park. when i was wrighting this frontend i was to deal with incovenient naming in backend. People, with whom i was made to work with, where a bit lazy, but it is the main problem. The problem is that they dont here me, they are (not they, he) doing jut in the way he understands it. When i tried to speak to him with the purpose of making it clear to him how to write efficient functions and how to name http routes. he said that he understood everything, but did nothing: he just did nothing, no changes were applied to backend. So, i understood two very imporntant things: 1) if you are going to create some sort of project - for the first choose people, team, that would be able to help you, team that would hear you 2) sometimes you should just deal with the things you are given"
                        src={session.user.image}
                        alt={session.user.username}
                        width={32}
                        height={32}
                        className={'w-full'}
                    />
                )}

                <span className={'sr-only'}>my profile</span>
            </HeaderLink>
        </div>
    );
};

export default Header;
