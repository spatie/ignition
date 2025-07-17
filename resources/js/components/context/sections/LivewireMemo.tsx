import React from 'react';
import { LivewireContext } from 'types';
import ContextList from '../ContextList';

type Props = {
    component: LivewireContext;
}

export default function LivewireMemo(props: Props) {
    const livewire = props.component;

    if (!livewire) {
        return null;
    }

    if (!livewire.memo) {
        return null;
    }

    return <ContextList items={livewire.memo} />;
}
