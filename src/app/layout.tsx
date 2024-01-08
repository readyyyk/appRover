import { ReactNode } from 'react';

import { Ubuntu } from 'next/font/google';
import { cookies } from 'next/headers';

import AuthProvider from '@/app/_components/auth-provider';
import Header from '@/app/_components/header';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import '@/styles/scrollbar.css';
import { TRPCReactProvider } from '@/trpc/react';

const primaryFont = Ubuntu({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
} as const);

export const metadata = {
    title: 'AppRover - the poll management app',
    description:
        'AppRover is a poll management app that helps you track votes and company polls.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'dark relative min-h-screen overflow-x-hidden bg-background px-4 pb-24 pt-4 md:pb-0 font-sans antialiased',
                    `font-sans ${primaryFont.className}`,
                )}
            >
                <AuthProvider>
                    <TRPCReactProvider cookies={cookies().toString()}>
                        {children}
                        <Header />
                    </TRPCReactProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
