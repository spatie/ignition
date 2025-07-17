import React from 'react';
import { ErrorFrame } from '../../../types';
import DefinitionList from 'components/ui/DefinitionList';

export default function FrameArguments({ frame }: { frame: ErrorFrame }) {
    return (
        <DefinitionList className="pb-10 px-6 @lg:px-10">
            {frame.arguments?.map((argument, key) => (
                <DefinitionList.Row
                    key={key}
                    label={
                        <div className="font-mono text-sm">
                            <span className="hljs-function hljs-params hljs-variable">
                                <span title="by reference">{argument.is_variadic && '…'}</span>
                                <span>{argument.passed_by_reference && '&'}</span>
                                <span title="variadic">$</span>
                                {argument.name}
                            </span>
                            <span className="text-xs pl-px hljs-function hljs-keyword">
                                :{argument.original_type}
                                {argument.truncated && ' - truncated'}
                            </span>
                        </div>
                    }
                    value={argument.value}
                    type={argument.original_type}
                    stacked
                />
            ))}
        </DefinitionList>
    );
}
