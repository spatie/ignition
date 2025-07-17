import React from 'react';
import SyntaxHighlighter from "./SyntaxHighlighter";

type Props = {
    children: React.ReactNode;
    language: 'sql' | 'curl' | 'json';
};

export default function HighlightedCode({ children, language }: Props) {
    return (
        <SyntaxHighlighter language={language} customStyle={{ background: 'transparent' }}>
            {children}
        </SyntaxHighlighter>
    );
}
