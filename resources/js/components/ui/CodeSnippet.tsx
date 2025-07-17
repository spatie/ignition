import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import sqlFormatter from 'sql-formatter';
import CopyButton from './CopyButton';
import HighlightedCode from './HighlightedCode';
import RoundedButton from './RoundedButton';

type Props = {
    value: string;
    limitHeight?: boolean;
    language?: null | 'sql' | 'curl' | 'json';
    transparent?: boolean;
    overflowX?: boolean;
};

// TODO: Json/Curl editor?

export default function CodeSnippet({
    value,
    limitHeight = true,
    language = null,
    transparent = false,
    overflowX = true,
}: Props) {
    const [isCollapsed, setIsCollapsed] = useState(limitHeight);
    const [isOverflowing, setIsOverflowing] = useState(language === 'sql');
    const ref = useRef<HTMLPreElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
        }
    }, [ref.current, isCollapsed, value, limitHeight]);

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        // Triple click means select all
        if (event.detail === 3) {
            selectAll();
            return;
        }

        if (!isOverflowing) {
            return;
        }

        // Ignore click even when selecting expanded code.
        if ((!isCollapsed && window.getSelection()?.toString().length) || 0 > 0) {
            return;
        }

        setIsCollapsed(!isCollapsed);
    }

    function selectAll() {
        const range = document.createRange();
        range.selectNodeContents(containerRef.current!);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
    }

    return (
        <div
            ref={containerRef}
            className={`
                ${isOverflowing ? 'cursor-pointer' : ''}
                ${transparent ? '' : '~bg-gray-500/5'}
                group py-2 relative`}
            onClick={handleClick}
        >
            <div className={`${overflowX ? 'mask-fade-x' : ''}`}>
                {language === 'sql' && (
                    <>
                        {isCollapsed ? (
                            <pre
                                className={`pl-4 ${
                                    overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'truncate pr-8'
                                }`}
                            >
                                <code className="font-mono leading-relaxed text-sm font-normal">
                                    <HighlightedCode language="sql">{value}</HighlightedCode>
                                </code>
                            </pre>
                        ) : (
                            <pre
                                className={`pl-4 ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'pr-8'}`}
                            >
                                <code className="font-mono leading-relaxed text-sm font-normal">
                                    <HighlightedCode language="sql">
                                        {sqlFormatter.format(value, { language: 'mysql' })}
                                    </HighlightedCode>
                                </code>
                            </pre>
                        )}
                    </>
                )}
                {language !== 'sql' && (
                    <pre
                        ref={ref}
                        className={`
                            pl-4
                            ${isOverflowing ? 'mask-fade-y -mb-2' : ''}
                            ${isCollapsed ? 'overflow-y-hidden max-h-32' : ''}
                            ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'pr-8'}
                        `}
                    >
                        <code className="font-mono leading-relaxed text-sm font-normal">
                            {language ? <HighlightedCode language={language}>{value}</HighlightedCode> : value}
                        </code>
                    </pre>
                )}
            </div>

            <CopyButton className="absolute top-2 right-3" value={value} />

            {isOverflowing && (
                <RoundedButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="
                        absolute -bottom-3 left-1/2 -translate-x-1/2
                        opacity-0 group-hover:opacity-100 scale-80 group-hover:scale-100 delay-100
                    "
                >
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`transition-transform duration-300 transform ${isCollapsed ? '' : 'rotate-180'}`}
                    />
                </RoundedButton>
            )}
        </div>
    );
}
