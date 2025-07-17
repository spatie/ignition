import React, { ButtonHTMLAttributes } from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;


export default function Button({children, className= '', disabled = false, ...props}: Props) {
    return (
        <button
            disabled={disabled}
            className={`px-4 h-8 whitespace-nowrap border-b
            text-xs uppercase tracking-wider font-bold rounded-sm
            shadow-md
            transform
            transition-animation
            hover:shadow-lg
            active:shadow-inner
            active:translate-y-px
            ${disabled ? 'opacity-50' : 'opacity-100'}
            ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}
