import React, { useContext } from 'react';
import { unixToDate } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import DebugItem from '../DebugItem';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

export default function Logs() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const logs = Object.values(errorOccurrence.context_items.logs!);

    return (
        <>
            {logs.map((log, index) => (
                <DebugItem key={index} context={log.context} level={log.level} time={unixToDate(log.microtime)}>
                    <CodeSnippet value={log.message} />
                </DebugItem>
            ))}
        </>
    );
}
