import { FileCreateResSchema } from '@/types/file';

import { withWrapped } from '@/lib/3rd-party-call';

export const tempUpload = async ({
    data,
    token,
}: {
    data: FormData;
    token: string;
}) => {
    return await withWrapped(`/files/upload`, FileCreateResSchema, null, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: data,
    });
};
