import React from 'react';
import LineNumber from './LineNumber';

type Props = {
    path: string;
    className?: string;
    style?: React.CSSProperties;
    editable?: boolean;
    lineNumber?: number;
};

export default function FilePath({ path, className = '', editable = false, lineNumber, ...props }: Props) {
    const segments = path.replace(/^\/Users/, '~').split('/');
    const file = segments.pop() || '';
    const fileSegments = file.split('.');

    return (
        <span className={`ui-path ${className}`} {...props}>
            {segments.map((segment, i) => (
                <span key={i}>
                    {segment}/<wbr />
                </span>
            ))}
            {fileSegments.map((fileSegment, i) => (
                <span key={i} className={i === 0 ? 'font-semibold' : ''}>
                    {i > 0 && '.'}
                    {fileSegment}
                </span>
            ))}
            {lineNumber && <LineNumber value={lineNumber} />}
        </span>
    );
}
