import React, { useContext } from 'react';
import DebugTabs from './DebugTabs';
import Logs from 'components/debug/tabs/Logs';
import Dumps from 'components/debug/tabs/Dumps';
import Queries from './tabs/Queries';
import Glows from './tabs/Glows';
import ErrorBoundary from '../ui/ErrorBoundary';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

export default function Debug() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const dumps = errorOccurrence.context_items.dumps;
    const queries = errorOccurrence.context_items.queries;
    const logs = errorOccurrence.context_items.logs;
    const glows = errorOccurrence.glows;

    return (
        <ErrorBoundary>
            <DebugTabs className="@container">
                <DebugTabs.Tab component={Dumps} name="Dumps" count={Object.keys(dumps || []).length} />
                <DebugTabs.Tab component={Glows} name="Glows" count={glows.length} />
                <DebugTabs.Tab component={Queries} name="Queries" count={Object.keys(queries || []).length} />
                <DebugTabs.Tab component={Logs} name="Logs" count={Object.keys(logs || []).length} />
            </DebugTabs>
        </ErrorBoundary>
    );
}
