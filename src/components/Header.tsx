import { FC, ReactNode } from 'react';

import { FileIcon, HomeIcon, UserIcon, UsersIcon } from 'lucide-react';
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
    return (
        <div className="fixed bg-secondary rounded-full w-16 h-[50dvh] top-1/2 -translate-y-1/2 left-4 p-2 flex flex-col justify-between shadow-lg shadow-slate-900 hover:shadow-slate-800 transition-all">
            <HeaderLink href={'/'}>
                <HomeIcon />
            </HeaderLink>

            <div className={'space-y-2'}>
                <HeaderLink href={'/groups'}>
                    <UsersIcon />
                </HeaderLink>
                <HeaderLink href={'/files'}>
                    <FileIcon />
                </HeaderLink>
            </div>

            <HeaderLink href={'/me'}>
                <UserIcon />
            </HeaderLink>
        </div>
    );
};

export default Header;
