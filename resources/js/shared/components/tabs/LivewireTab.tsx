import * as React from 'react';
import { getContextValues } from 'resources/js/shared/util';
import { ErrorOccurrenceWithFrames } from '../../types';
import DefinitionList from 'resources/js/shared/components/DefinitionList';

type Props = {
    errorOccurrence: ErrorOccurrenceWithFrames;
};

export default function LivewireTab({ errorOccurrence }: Props) {
    const livewire = getContextValues(errorOccurrence, 'livewire');

    const predefinedKeys: { [key: string]: string } = {
        component_alias: 'Alias',
        component_id: 'Id',
        component_class: 'Class',
    };

    function lookupKey(key: string) {
        return predefinedKeys[key] || key;
    }

    return (
        <div className="tab-content">
            <div className="layout-col">
                <DefinitionList title="Component" className="tab-content-section">
                    {Object.entries(livewire)
                        .filter(([key]) => key.startsWith('component_'))
                        .map(([key, value]) => (
                            <DefinitionList.Row key={key} value={value} label={lookupKey(key)} />
                        ))}
                </DefinitionList>

                {livewire.hasOwnProperty('updates') && (
                    <DefinitionList title="Updates" className="tab-content-section">
                        {livewire.updates.map(
                            ({ type, payload }: { type: string; payload: { [key: string]: string } }, key: string) => (
                                <DefinitionList.Row
                                    key={key}
                                    label={type}
                                    value={
                                        <DefinitionList>
                                            {Object.entries(payload || []).map(([key, parameter]) => (
                                                <DefinitionList.Row key={key} label={key} value={parameter as string} />
                                            ))}
                                        </DefinitionList>
                                    }
                                />
                            ),
                        )}
                    </DefinitionList>
                )}

                {livewire.hasOwnProperty('data') && (
                    <DefinitionList title="Data" className="tab-content-section">
                        {Object.entries(livewire.data || {}).map(([key, value]) => (
                            <DefinitionList.Row key={key} value={value as any} label={key} />
                        ))}
                    </DefinitionList>
                )}
            </div>
        </div>
    );
}
