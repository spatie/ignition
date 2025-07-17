import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  anchor: string;
};

export default function ContextNavGroup({ title, children, anchor }: Props) {
    return (
        <li>
            <a href={`#context-${anchor}`} className="uppercase tracking-wider ~text-gray-500 text-xs font-bold">
                {title}
            </a>
            <ul className="mt-3 grid grid-cols-1 gap-3">
                {children}
            </ul>
        </li>
    )
}
