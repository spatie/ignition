import React from 'react';
import { LivewireContext } from 'types';
import ContextList from '../ContextList';

type Props = {
    component: LivewireContext;
}

export default function LivewireComponent(props: Props) {
    const livewire = props.component;

    if (!livewire) {
        return null;
    }

    return (
        <ContextList
            items={{
                Component: livewire.component_class,
                Alias: livewire.component_alias,
                ID: livewire.component_id,
            }}
        />
    );
}
