'use client';

import * as React from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/_components/ui/tooltip';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    Omit<
        React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
        'value'
    > & {
        value: Record<number, string>;
    }
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            'relative h-2 w-full overflow-hidden rounded-full bg-secondary flex',
            className,
        )}
        {...props}
    >
        {Object.entries(value)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([key, value], i) => {
                const keyNumber = Math.floor(Number(key));
                return (
                    <TooltipProvider key={`bar-${keyNumber}-${i}`}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="h-full transition-all"
                                    style={{
                                        width: keyNumber + '%',
                                        backgroundColor: value,
                                    }}
                                >
                                    <span className={'sr-only'}>
                                        {keyNumber}%
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{keyNumber}%</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
