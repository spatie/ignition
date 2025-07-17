import React, { useContext } from 'react';
import CodeSnippet from '../../ui/CodeSnippet';
import DebugItem from '../DebugItem';
import { unixToDate } from '../../../util';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

export default function Glows() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const glows = errorOccurrence.glows;

    return (
        <>
            {glows.map((glow, index) => (
                <DebugItem
                    key={index}
                    level={glow.message_level}
                    context={glow.meta_data}
                    time={unixToDate(glow.microtime)}
                >
                    <CodeSnippet value={glow.name} />
                </DebugItem>
            ))}
        </>
    );
}
