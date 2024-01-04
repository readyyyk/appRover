import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

import TRPCProvider from '@/app/_trpc/Provider';
import '@/assets/scrollbar.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Ubuntu({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
    title: 'AppRover - the poll management app',
    description:
        'AppRover is a poll management app that helps you track votes and company polls.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={'dark'}>
            <body
                className={cn(
                    'relative min-h-screen overflow-x-hidden bg-background px-4 pb-24 pt-4 md:pb-0 font-sans antialiased',
                    inter.className,
                )}
            >
                <AuthProvider>
                    <TRPCProvider>
                        {children}
                        <Header />
                    </TRPCProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
