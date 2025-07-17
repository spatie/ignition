import React, { useContext } from 'react';
import StackTraceExplorer from './StackTraceExplorer';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

type Props = {
    openFrameIndex?: number;
};

export default function StackTrace({ openFrameIndex }: Props) {
    const { frames } = useContext(ErrorOccurrenceContext);

    return (
        <div className="@container bg-gray-25 dark:shadow-none dark:bg-gray-800/50 bg-gradient-to-bl from-white dark:from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20">
            <div className="grid grid-cols-1 @4xl:grid-cols-[33.33%_66.66%] @4xl:grid-rows-[57rem] items-stretch overflow-hidden">
                <StackTraceExplorer frames={frames} openFrameIndex={openFrameIndex} />
            </div>
        </div>
    );
}
