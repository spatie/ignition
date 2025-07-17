import React from 'react';
import { ErrorSolution } from '../../types';

type Props = {
    solution: ErrorSolution;
};

import ReactMarkdown from 'react-markdown/react-markdown.min.js';
import SyntaxHighlighter from "../ui/SyntaxHighlighter";

export default function SolutionDescription({ solution }: Props) {
    return (
        <div className="grid grid-cols-1 gap-2">
            <ReactMarkdown
                children={solution.description}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');

                        return !inline ? (
                            <SyntaxHighlighter
                                {...props}
                                language={match ? match[1] : null}
                                children={String(children).replace(/\n$/, '')}
                                customStyle={{
                                    margin: '0.5rem 0',
                                    background: 'rgba(255,255,255,0.75)',
                                    padding: '0.25rem 0.5rem',
                                    overflowX: 'scroll',
                                }}
                            />
                        ) : (
                            <code {...props} className={className} style={{
                                background: 'rgba(255,255,255,0.75)',
                                padding: '0.15rem 0.25rem'
                            }}>
                                {children}
                            </code>
                        )
                    }
                }}
            />

            <ul className="grid grid-cols-1 gap-1 text-sm">
                {Object.entries(solution.links).map(([title, link], index) => (
                    <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="underline text-emerald-700 hover:text-emerald-800">
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
