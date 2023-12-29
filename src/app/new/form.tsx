'use client';

import { FC } from 'react';

interface Props {}

const Form: FC<Props> = ({}) => {
    const handleSubmit = async () => {};

    return (
        <form
            onSubmit={void handleSubmit}
            className={'flex flex-col space-y-3'}
        >
            
        </form>
    );
};

export default Form;
