'use client';

import { FC, useEffect, useState } from 'react';

import { LinkIcon } from 'lucide-react';

import { Button } from '@/app/_components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/_components/ui/tooltip';

interface Props {
    text?: string;
}

const CopyButton: FC<Props> = ({ text = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = async () => {
        await navigator.clipboard.writeText(text);
        setIsOpen(true);
    };
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => setIsOpen(false), 3000);
            return () => clearTimeout(t);
        }
    }, [isOpen]);
    return (
        <TooltipProvider>
            <Tooltip open={isOpen}>
                <TooltipTrigger asChild>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={handleClick}
                    >
                        <LinkIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className={'bg-green-500'}>
                    Copied!
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CopyButton;
