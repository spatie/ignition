import React, { useContext } from 'react';
import { jsonStringify } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

export default function Body() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const body = errorOccurrence.context_items?.request_data?.body;

    if (!body) {
        return null;
    }

    return <CodeSnippet value={jsonStringify(body)} />;
}
