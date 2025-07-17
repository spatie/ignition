import React from 'react';

type Props = {
    path: string;
    lineNumber?: null | number;
};

export default function RelaxedFullyQualifiedClassName({ path,  lineNumber = null }: Props) {
    const parts = path.split('\\');
    const tightSpace = String.fromCharCode(8201);
    
    return (
        <span className="inline-flex flex-wrap items-baseline">
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    <span key={index}>
                        {part}
                    </span>
                    {index !== parts.length - 1 && <span>{tightSpace}\{tightSpace}</span> }
                </React.Fragment>             
            ))}

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
