import { addDays, format } from 'date-fns';

import { IFileInfo } from '@/types/file';
import { AllPollStates, IPollWithOwner } from '@/types/poll';

export const random = ({
    min = 0,
    max = 100,
    omit,
}: {
    min?: number;
    max?: number;
    omit?: number[];
}): number => {
    const res = Math.floor(Math.random() * (max - min + 1) + min);
    return omit?.includes(res) ? random({ min, max, omit }) : res;
};

export const randomStr = (l: number) =>
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam possimus nesciunt, dolorum reprehenderit consectetur sequi minus totam ratione delectus corporis perspiciatis, quas porro! Deleniti ratione totam officia libero omnis impedit.'.slice(
        0,
        l,
    );

export function createMocksFactory<T>(
    callback: ({ id }: { id: number }) => T,
): ({ n, usedIds }: { n: number; usedIds?: number[] }) => T[] {
    return ({ n, usedIds }: { n: number; usedIds?: number[] }): T[] => {
        const data: T[] = [];
        for (let i = 0; i < n; i++) {
            const newId = random({
                min: 1,
                max: Math.max(100, n),
                omit: usedIds,
            });
            usedIds = usedIds ? [...usedIds, newId] : [newId];
            data.push(callback({ id: newId }));
        }
        return data;
    };
}

export const createMockPoll = ({ id }: { id: number }): IPollWithOwner => {
    const userId = random({ min: 1, max: 3 });
    const pollId = id;
    const voter_count = random({ min: 1, max: 4000 });
    const voted_for = random({ max: voter_count });
    const voted_against = random({ max: voter_count - voted_for });
    return {
        id: pollId,
        title: `${pollId} - Mock Poll`,
        file_id: random({}),
        owner_id: random({}),
        deadline: format(addDays(new Date(), random({})), 'yyyy-MM-dd'),
        state: AllPollStates[Math.floor(Math.random() * AllPollStates.length)]!,
        // result_url: 'https://example.com',
        voted_for,
        voted_against,
        voter_count,
        owner: {
            id: userId,
            image: `https://api.dicebear.com/7.x/identicon/svg?seed=${userId}`,
            username: `${userId} - Mock User`,
        },
    };
};

export const createMockFile = ({ id }: { id: number }): IFileInfo => {
    return {
        id: id,
        name: id + ' - ' + randomStr(random({ max: 30 })),
        filetype: 'application/msword',
        size: random({ max: 10000 }),
        owner_id: Math.floor(Math.random() * 100),
        created_at: format(new Date(), 'yyyy-MM-dd'),
        link: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc',
    };
};

export const createMockPolls = createMocksFactory(createMockPoll);
export const createMockFiles = createMocksFactory(createMockFile);
