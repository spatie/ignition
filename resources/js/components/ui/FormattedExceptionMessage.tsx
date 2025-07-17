import React, { useEffect, useState } from 'react';
import ExceptionMessage from './ExceptionMessage';
import CodeSnippet from './CodeSnippet';

type Props = {
    message: string;
    exceptionClass: string;
    className?: string;
};

export default function FormattedExceptionMessage({ message, exceptionClass, className = '' }: Props) {
    const [cleanedUpMessage, setCleanedUpMessage] = useState<string>(message);
    const [sqlQuery, setSqlQuery] = useState<string | null>(null);

    useEffect(() => {
        if (exceptionClass === 'Illuminate\\Database\\QueryException' || message.match(/SQLSTATE\[.*\].*SQL: .*\)/s)) {
            const sqlQueryPattern = /\((?:|Connection: .*?, )SQL: (?<query>.*?)\)($| \(View: .*\)$)/s;
            const [, query] = message.match(sqlQueryPattern) || [];
            setSqlQuery(query);
            setCleanedUpMessage(message.replace(sqlQueryPattern, '$2'));
        }
    }, [message, exceptionClass]);

    return (
        <>
            <ExceptionMessage message={cleanedUpMessage} className={className} />

            {sqlQuery && <CodeSnippet value={sqlQuery} language="sql" />}
        </>
    );
}
