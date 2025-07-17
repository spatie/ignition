import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function InlineCodeSnippet({ children, className = '' }: Props) {
    return (
        <code className={`font-mono leading-relaxed font-normal ~bg-gray-500/5 px-1 py-1 ${className}`}>
            {children}
        </code>
    );
}
