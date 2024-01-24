import { addDays } from 'date-fns';

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
    const votersCount = random({ min: 1, max: 4000 });
    const votedFor = random({ max: votersCount });
    const votedAgainst = random({ max: votersCount - votedFor });
    return {
        id: pollId,
        title: `${pollId} - Mock Poll`,
        documentUrl: 'https://example.com',
        ownerId: random({}),
        deadline: addDays(new Date(), random({})),
        state: AllPollStates[Math.floor(Math.random() * AllPollStates.length)]!,
        resultUrl: 'https://example.com',
        votedFor,
        votedAgainst,
        votersCount,
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
        filetype: 'text/plain',
        ownerId: Math.floor(Math.random() * 100),
        createdAt: new Date(),
        link: 'https://example.com',
    };
};

export const createMockPolls = createMocksFactory(createMockPoll);
export const createMockFiles = createMocksFactory(createMockFile);
