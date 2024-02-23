import { FC } from 'react';

import CopyButton from '@/app/_components/copy-button';
import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog';
import { env } from '@/env';
import { api } from '@/trpc/server';

interface Props {
    poll_id: number;
}

const InviteDialog: FC<Props> = async ({ poll_id }) => {
    const link = await api.polls.getInvite.query(poll_id);
    if (!link.success) {
        console.warn(link.message);
        throw new Error('Error getting invitation link');
    }

    link.data = env.BACKEND_URL + link.data;

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Invite other users to the poll!
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <p className="bg-secondary font-mono text-lg text-foreground break-all px-2 py-1 rounded m-0">
                        {link.data}
                    </p>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <CopyButton text={link.data}></CopyButton>
                <AlertDialogCancel> Close </AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};

export default InviteDialog;
