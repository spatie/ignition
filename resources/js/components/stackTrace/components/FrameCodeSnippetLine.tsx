import React from 'react';
import useEditorUrl from '../../../hooks/useEditorUrl';
import { ErrorFrame } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Row } from './FrameCodeSnippet';
// @ts-ignore
import { createElement } from 'react-syntax-highlighter';
import RoundedButton from 'components/ui/RoundedButton';
import CopyButton from "../../ui/CopyButton";

type Props = {
    highlight: boolean;
    frame: ErrorFrame;
    lineNumber: number;
    row: Row;
};

export default function FrameCodeSnippetLine({
    highlight,
    row,
    frame,
    lineNumber
}: Props) {
    const {url: editorUrl, clipboard} = useEditorUrl({ file: frame.file, lineNumber });

    return (
        <span
            className={`
                flex group leading-loose hover:~bg-red-500/10
                ${highlight ? ' ~bg-red-500/20' : ''}
            `}
        >
            {!clipboard && (
                <span className="z-30 opacity-0 group-hover:opacity-100 sticky left-10 w-0 h-full">
                    <a href={editorUrl} className="-ml-3 block">
                        <RoundedButton>
                            <FontAwesomeIcon className="text-xs" icon={faPencilAlt} />
                        </RoundedButton>
                    </a>
                </span>
            )}

            {clipboard && (
                <span className="z-30 opacity-0 group-hover:opacity-100 sticky w-0 h-full">
                    <CopyButton value={editorUrl} outside direction="right"/>
                </span>
            )}

            <span className="pl-6">
                {createElement({ node: row, useInlineStyles: false, key: `code-segement-${lineNumber}` })}
            </span>
        </span>
    );
}
