import React from 'react';
import { LivewireContext } from 'types';
import ContextList from "../ContextList";

type Props = {
    component: LivewireContext;
}

export default function LivewireCalls(props: Props) {
    const livewire = props.component;

    if (!livewire || !livewire.calls) {
        return null;
    }

    return <>
        {livewire.calls.map((call, index) => (
            <ContextList
                key={index}
                items={{
                    Method: call.method,
                    Params: call.params,
                    Path: call.path ?? undefined,
                }}
            />
        ))}
    </>;
}
