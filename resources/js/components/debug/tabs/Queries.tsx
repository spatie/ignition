import React, {useContext, useState} from 'react';
import {unixToDate} from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import DebugItem from '../DebugItem';
import {QueryDebug} from "types";
import DefinitionList from "components/ui/DefinitionList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

function Bindings({bindings, hidden = false}: { bindings: String[], hidden: boolean }) {
    const [isHidden, setHidden] = useState(hidden);

    return (
        <div>
            <button
                type="button"
                className="font-bold text-xs ~text-gray-500 uppercase tracking-wider flex flex-row items-center gap-2 mb-2"
                onClick={() => setHidden(!isHidden)}
            >
                <FontAwesomeIcon
                    icon={faAngleRight}
                    className={`transition-transform duration-300 transform ${isHidden ? '' : 'rotate-90'}`}
                />
                {bindings.length} query {bindings.length > 1 ? 'parameters' : 'parameter'}
            </button>
            {!isHidden && (
                <DefinitionList className="ml-4">
                    {bindings.map((binding, index) => (
                        <DefinitionList.Row small key={index} value={binding} label={<code className="text-sm text-gray-500">{index+1}</code>}/>
                    ))}
                </DefinitionList>
            )}
        </div>
    )
}

export default function Queries() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    let queries = Object.values(errorOccurrence.context_items.queries!);

    function canReplaceBindings(query: QueryDebug) {
        return query.bindings !== null && query.sql.split('?').length - 1 === query.bindings.length;
    }

    function replaceBindings(query: QueryDebug) {
        let sql = query.sql;

        query.bindings?.forEach((binding) => {
            sql = sql.replace('?', binding);
        });

        return sql;
    }

    return (
        <>
            {queries.map((query, index) => (
                <DebugItem
                    key={index}
                    time={unixToDate(query.microtime)}
                    meta={{
                        runtime: `${query.time}ms`,
                        connection: query.connection_name,
                    }}
                >
                    {query.bindings && query.bindings.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1">
                            <CodeSnippet value={canReplaceBindings(query) ? replaceBindings(query) : query.sql}
                                         language="sql"/>
                            <Bindings bindings={query.bindings} hidden={canReplaceBindings(query)}/>
                        </div>
                    ) : (
                        <CodeSnippet value={query.sql} language="sql"/>
                    )}
                </DebugItem>
            ))}
        </>
    );
}
