import React from 'react';
import { LivewireContext } from 'types';
import DefinitionList from '../../ui/DefinitionList';

type Props = {
    component: LivewireContext;
}

export default function LivewireUpdates(props: Props) {
    const livewire = props.component;

    if (!livewire) {
        return null;
    }

    return (
        <DefinitionList>
            {livewire.updates.map(({ payload, type }, index) => (
                <DefinitionList.Row key={index} label={type} value={payload} />
            ))}
        </DefinitionList>
    );
}
