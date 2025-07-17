import React from 'react';
import RelaxedFilePath from './RelaxedFilePath';
import useEditorUrl from '../../hooks/useEditorUrl';
import CopyButton from "./CopyButton";

type Props = {
    path: string;
    lineNumber?: number;
    className?: string;
};

export default function EditorLink({ path, lineNumber, className }: Props) {
    const {url, clipboard} = useEditorUrl({ file: path, lineNumber });

    if (clipboard) {
        return (
            <CopyButton value={path} outside direction="bottom">
                <span className={`hover:underline ${className}`}>
                    <RelaxedFilePath path={path} lineNumber={lineNumber} />
                </span>
            </CopyButton>
        );
    }

    return (
        <a href={url} className={`hover:underline ${className}`}>
            <RelaxedFilePath path={path} lineNumber={lineNumber}/>
        </a>
    );
}
