import React from 'react';
import DefinitionList from '../../ui/DefinitionList';
import startCase from 'lodash/startCase';

export default function Custom({ items }: { items: {[key: string]: any} }) {
    return (
        <DefinitionList>
            {Object.entries(items).map(([key, value]) => (
                <DefinitionList.Row key={key} value={value} label={startCase(key)} />
            ))}
        </DefinitionList>
    );
}
