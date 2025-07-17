import React, { useState } from 'react';
import ContextList from '../context/ContextList';
import { LogLevel } from '../../types';
import CodeSnippet from '../ui/CodeSnippet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDatabase, faListUl, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { jsonStringify } from '../../util';
import Tag from 'components/ui/Tag';
import SmallButton from 'components/ui/SmallButton';

type Props = {
    children: React.ReactNode;
    context?: Record<string, string | object> | null;
    time: Date;
    level?: LogLevel | null;
    meta?: Record<string, string | number> | null;
};

export default function DebugItem({ children, context = null, level = null, meta = null, time }: Props) {
    const [showRawContext, setShowRawContext] = useState(false); // TODO: Implement this

    const logLevelColors = {
        error: 'red',
        warn: 'orange',
        warning: 'orange',
        info: 'blue',
        debug: 'green',
        trace: 'gray',
        notice: 'purple',
        critical: 'red',
        alert: 'red',
        emergency: 'red',
    } as Record<LogLevel, 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'gray' | undefined>;

    return (
        <div className="min-w-0 grid grid-cols-1 gap-2">
            <div className="flex items-center gap-1">
                <Tag color={level ? logLevelColors[level] : 'gray'} className="font-mono">
                    {time.toLocaleTimeString()}
                </Tag>
                {level && <Tag color={logLevelColors[level]}>{level}</Tag>}
                {meta &&
                    Object.entries(meta).map(([key, value]) => (
                        <React.Fragment key={key}>
                            {key === 'runtime' && (
                                <Tag className="inline-flex items-center gap-2">
                                    <FontAwesomeIcon title="Runtime" className="opacity-50" icon={faStopwatch} />{' '}
                                    {value}
                                </Tag>
                            )}
                            {key === 'connection' && (
                                <Tag className="inline-flex items-center gap-2">
                                    <FontAwesomeIcon title="Connection" className="opacity-50" icon={faDatabase} />{' '}
                                    {value}
                                </Tag>
                            )}
                            {key !== 'runtime' && key !== 'connection' && (
                                <Tag>
                                    {key}: {value}
                                </Tag>
                            )}
                        </React.Fragment>
                    ))}

                {context && (
                    <>
                        <div className="ml-auto">
                            <SmallButton onClick={() => setShowRawContext(!showRawContext)}>
                                <FontAwesomeIcon
                                    icon={showRawContext ? faListUl : faCode}
                                    className="text-[8px] ~text-gray-500 group-hover:text-indigo-500"
                                />

                                {showRawContext ? 'As list' : 'Raw'}
                            </SmallButton>
                        </div>
                    </>
                )}
            </div>

            <div>{children}</div>

            {context && (
                <>
                    {showRawContext ? (
                        <CodeSnippet value={jsonStringify(context)} language="json" />
                    ) : (
                        <div className="pl-4">
                            <ContextList items={context} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
