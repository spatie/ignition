import React, { useContext } from 'react';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

type Props = {
    path: string;
    lineNumber?: null | number;
};

export default function RelaxedFilePath({ path: fullPath, lineNumber = null }: Props) {
    const { application_path } = useContext(ErrorOccurrenceContext);
    const path = fullPath.replace(application_path + '/', '').replace(/\/Users\/.*?\//, '~/');
    const parts = path.split('/');
    const fileParts = parts.pop()?.split('.') || [];
    const extension = fileParts.pop();
    const fileName = fileParts.join('.');
    const tightSpace = String.fromCharCode(8201);

    return (
        <span className="inline-flex flex-wrap items-baseline">
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    <span key={index}>
                        {part}
                    </span>
                    <span>{tightSpace}/{tightSpace}</span>
                </React.Fragment>
            ))}
            <span className="font-semibold">{fileName}</span>
            <span>.{extension}</span>
            {lineNumber &&
                <>
                    {tightSpace}
                    <span className="whitespace-nowrap">
                        :{tightSpace}
                        <span className="font-mono text-xs">{lineNumber}</span>
                    </span>
                </>
            }
        </span>
    );
}
