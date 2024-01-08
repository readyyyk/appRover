import { Dispatch, FC, SetStateAction } from 'react';

import {
    FilterIcon,
    PlusIcon,
    /*, SearchIcon*/
} from 'lucide-react';
import Link from 'next/link';

import { AllPollStates, IPollState } from '@/types/poll';

import { Button } from '@/app/_components/ui/button';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/_components/ui/popover';
import { Separator } from '@/app/_components/ui/separator';

interface Props {
    stateSearch: [string, Dispatch<SetStateAction<string>>];
    stateAvailableStates: [
        IPollState[],
        Dispatch<SetStateAction<IPollState[]>>,
    ];
    stateOwnerSearchValue: [string, Dispatch<SetStateAction<string>>];
    stateDeadline: [[Date, Date], Dispatch<SetStateAction<[Date, Date]>>];
}

const SearchBar: FC<Props> = ({
    stateSearch: [searchValue, setSearchValue],
    stateDeadline: [_, __],
    stateAvailableStates: [selectedStates, setSelectedStates],
    stateOwnerSearchValue: [ownerSearchValue, setOwnerSearchValue],
}) => {
    return (
        <div className="w-full sticky top-0 pt-10 z-50 bg-gradient-to-t from-transparent to-15% to-background pb-6">
            <div className={'flex gap-3 '}>
                <Link href={'/polls/new'}>
                    <Button
                        variant="success"
                        className="h-full text-lg flex gap-1"
                    >
                        <span className="hidden md:inline">Create new</span>{' '}
                        <PlusIcon />
                    </Button>
                </Link>
                <Input
                    type="search"
                    placeholder="Search..."
                    className={'text-lg h-12'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'secondary'}
                            className={'p-2 h-12 aspect-square'}
                        >
                            <span className={'sr-only'}>Filters</span>
                            <FilterIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={'shadow-lg shadow-slate-900'}>
                        <Label>
                            <span className={'text-lg'}>Owner</span>
                            <Input
                                type={'text'}
                                className={'h-8'}
                                placeholder={'Owner name'}
                                value={ownerSearchValue}
                                onChange={(e) =>
                                    setOwnerSearchValue(e.target.value)
                                }
                            />
                        </Label>

                        <Separator className={'my-3'} />

                        <div className={'flex flex-col gap-2'}>
                            <span className={'text-lg'}>States</span>
                            {AllPollStates.map((state) => (
                                <Label
                                    key={`search-state-${state}`}
                                    className={
                                        'flex gap-2 items-center text-md ml-6'
                                    }
                                >
                                    <Checkbox
                                        checked={selectedStates.includes(state)}
                                        onCheckedChange={(checked) => {
                                            setSelectedStates((prev) =>
                                                checked
                                                    ? [...prev, state]
                                                    : prev.filter(
                                                          (a) => a !== state,
                                                      ),
                                            );
                                        }}
                                    ></Checkbox>
                                    <span>
                                        {state[0]?.toUpperCase() +
                                            state.slice(1)}
                                    </span>
                                </Label>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default SearchBar;
