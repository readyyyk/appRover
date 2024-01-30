'use client';

import { Dispatch, FC, SetStateAction } from 'react';

import Link from 'next/link';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/ui/select';
import { Skeleton } from '@/app/_components/ui/skeleton';
import { api } from '@/trpc/react';

interface Props {
    selectState: [number | null, Dispatch<SetStateAction<number | null>>];
}

const SelectMyFile: FC<Props> = ({ selectState: [selected, setSelected] }) => {
    const { data, isLoading, error } = api.files.my.useQuery();

    if (isLoading) {
        return <Skeleton className="w-full h-10" />;
    }

    if (error) {
        return (
            <p className={'text-center text-red-500 mb-4 break-words'}>
                {error.message}
            </p>
        );
    }

    if (!data?.success) {
        return (
            <p className={'text-center text-red-500 mb-4 break-words'}>
                {data?.message}
            </p>
        );
    }

    if (!data.data.files || data.data.files?.length === 0) {
        return (
            <Link
                href={'/files/new'}
                className="w-full h-10 d-flex justify-center bg-amber-700/25 text-amber-500 hover:bg-amber-700/30 transition-all hover:text-amber-400 rounded-lg flex items-center border-amber-500/0 hover:border-amber-500 border-2"
            >
                You have no files
            </Link>
        );
    }

    const onValueChange = (s: string) => {
        !isNaN(Number(s)) && setSelected(Number(s));
    };
    return (
        <Select
            onValueChange={onValueChange}
            value={selected === null ? undefined : String(selected)}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a file" />
            </SelectTrigger>
            <SelectContent>
                {data.data.files.map((el) => (
                    <SelectItem
                        value={String(el.id)}
                        key={`select-my-file-id-${el.id}`}
                    >
                        {el.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectMyFile;
