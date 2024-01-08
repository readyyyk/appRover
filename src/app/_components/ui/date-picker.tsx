'use client';

import { Dispatch, FC, SetStateAction, useState } from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Matcher } from 'react-day-picker';

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/_components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
    dataState: [Date | undefined, Dispatch<SetStateAction<Date | undefined>>];
    className?: string;
    disabled?: Matcher | Matcher[];
}

const DatePicker: FC<Props> = (props) => {
    const [date, setDate] = props.dataState;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        props.className,
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={props.disabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
