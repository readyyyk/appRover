'use client';

import { Dispatch, FC, SetStateAction } from 'react';

import { Loader2Icon } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/ui/select';
import { api } from '@/trpc/react';

interface Props {
    selectState: [string, Dispatch<SetStateAction<string>>];
}

const SelectMyFile: FC<Props> = ({ selectState: [selected, setSelected] }) => {
    const { data, isLoading, error } = api.files.myShort.useQuery();

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

    const onValueChange = (s: string) => {
        setSelected(s);
    };
    return (
        <Select onValueChange={onValueChange} value={selected}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a file" />
            </SelectTrigger>
            <SelectContent>
                {isLoading ? (
                    <Loader2Icon className="animate-spin m-auto" />
                ) : (
                    data.data.map((el) => (
                        <SelectItem
                            value={String(el.id)}
                            key={`select-my-file-id-${el.id}`}
                        >
                            {el.name}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};

export default SelectMyFile;
