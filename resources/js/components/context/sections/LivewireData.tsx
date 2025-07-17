import React from 'react';
import { LivewireContext } from 'types';
import ContextList from '../ContextList';

type Props = {
    component: LivewireContext;
}

export default function LivewireData(props: Props) {
    const livewire = props.component;

    if (!livewire) {
        return null;
    }

    return <ContextList items={livewire.data} />;
}
