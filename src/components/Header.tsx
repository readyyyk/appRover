'use client';

import { FC, ReactNode } from 'react';

import { FileIcon, HomeIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderLinkProps {
    href: string;
    children: ReactNode;
}

const HeaderLink: FC<HeaderLinkProps> = ({ href, children }) => {
    return (
        <Link
            href={href}
            className="rounded-full bg-background aspect-square w-full grid place-items-center p-1 shadow shadow-transparent hover:shadow-white transition"
        >
            {children}
        </Link>
    );
};

interface Props {}

const Header: FC<Props> = ({}) => {
    const { data: session } = useSession();

    return (
        <div className="fixed bg-secondary rounded-full w-16 h-[50dvh] top-1/2 -translate-y-1/2 left-4 p-2 flex flex-col justify-between shadow-lg shadow-slate-900 hover:shadow-slate-800 transition-all">
            <HeaderLink href={'/'}>
                <HomeIcon />
            </HeaderLink>

            <div className={'space-y-2'}>
                <HeaderLink href={'/groups'}>
                    <UsersIcon />
                    <span className={'sr-only'}>my groups</span>
                </HeaderLink>
                <HeaderLink href={'/files'}>
                    <FileIcon />
                    <span className={'sr-only'}>my files</span>
                </HeaderLink>
            </div>

            <HeaderLink href={'/me'}>
                {!session ? (
                    <UserIcon />
                ) : (
                    <Image
                        about="I created this link when i wa young... :(... it was in project for national children technology park. when i was wrighting this frontend i was to deal with incovenient naming in backend. People, with whom i was made to work with, where a bit lazy, but it is the main problem. The problem is that they dont here me, they are (not they, he) doing jut in the way he understands it. When i tried to speak to him with the purpose of making it clear to him how to write efficient functions and how to name http routes. he said that he understood everything, but did nothing: he just did nothing, no changes were applied to backend. So, i understood two very imporntant things: 1) if you are going to create some sort of project - for the first choose people, team, that would be able to help you, team that would hear you 2) sometimes you should just deal with the things you are given"
                        src={session.user.image}
                        alt={session.user.username}
                        width={32}
                        height={32}
                    />
                )}

                <span className={'sr-only'}>my profile</span>
            </HeaderLink>
        </div>
    );
};

export default Header;
