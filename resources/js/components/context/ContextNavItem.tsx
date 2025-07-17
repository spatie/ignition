import React from 'react';

type Props = {
    title: string;
    icon: React.ReactNode;
    anchor: string;
    active?: boolean;
};

export default function ContextNavItem({ icon, title, anchor, active = false }: Props) {
    return (
        <li>
            <a href={`#context-${anchor}`} className={`
                flex items-center gap-3
                group text-base hover:text-indigo-500
                ${active ? '~text-indigo-600' : ''}
            `}>
                <span className="opacity-50">{icon}</span>
                <span>{title}</span>
            </a>
        </li>
    );
}
