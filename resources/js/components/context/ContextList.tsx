import React from 'react';
import DefinitionList from '../ui/DefinitionList';

type Props = {
    items: Record<string, string | object | boolean | number | undefined>;
};

export default function ContextList({ items }: Props) {
    return (
        <DefinitionList>
            {Object.entries(items || {})
                .filter(([_key, value]) => typeof value !== 'undefined')
                .map(([key, value]) => (
                    <DefinitionList.Row key={key} label={key} value={value} />
                ))
            }
        </DefinitionList>
    );
}
