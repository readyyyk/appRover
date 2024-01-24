import { FC, ReactNode } from 'react';

import { FileIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import HeaderMe from '@/app/_components/header-me';
import Logo from '@/assets/approver.png';
import { cn } from '@/lib/utils';

interface HeaderLinkProps {
    href: string;
    className?: string;
    disabled?: boolean;
    children: ReactNode;
}

export const HeaderLink: FC<HeaderLinkProps> = ({
    href,
    className,
    children,
    disabled,
}) => {
    const title = href.replace('/', '');
    return (
        <Link
            title={title || 'home'}
            href={disabled ? '#' : href}
            className={cn(
                'rounded-full bg-background aspect-square w-auto h-full md:w-full md:h-auto grid place-items-center p-1 shadow shadow-transparent hover:shadow-white transition',
                className,
            )}
        >
            {children}
        </Link>
    );
};

const Header: FC = ({}) => {
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
                <HeaderLink href={'/groups'} disabled>
                    <UsersIcon />
                    <span className={'sr-only'}>my groups</span>
                </HeaderLink>
                <HeaderLink href={'/files'}>
                    <FileIcon />
                    <span className={'sr-only'}>my files</span>
                </HeaderLink>
            </div>

            <HeaderMe />
        </div>
    );
};

export default Header;
