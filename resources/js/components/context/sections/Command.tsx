import React from 'react';
import CodeSnippet from '../../ui/CodeSnippet';
import {ArgumentsContext} from "types";

type Props = {
    commandArguments: ArgumentsContext;
};

export default function Command({commandArguments} : Props) {
    return (
        <div className="col-span-2">
            <CodeSnippet value={commandArguments.join(' ')} />
        </div>
    );
}
