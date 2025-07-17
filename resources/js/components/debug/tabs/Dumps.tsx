import React, { useContext } from 'react';
import { unixToDate } from '../../../util';
import DebugItem from 'components/debug/DebugItem';
import EditorLink from '../../ui/EditorLink';
import SfDump from '../../ui/SfDump';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

export default function Dumps() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const dumps = Object.values(errorOccurrence.context_items.dumps!);

    return (
        <>
            {dumps.map((dump, index) => (
                <DebugItem key={index} time={unixToDate(dump.microtime)}>
                    <div className="mb-2">
                        <EditorLink path={dump.file} lineNumber={dump.line_number} className="text-sm" />
                    </div>
                    <SfDump value={dump.html_dump} />
                </DebugItem>
            ))}
        </>
    );
}
