import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function SubmitButton({children, className= '', disabled = false, onClick}: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 h-8 whitespace-nowrap border-b
            border-red-500/25 text-xs uppercase tracking-wider font-bold rounded-sm
            shadow-md
            transform
            transition-animation
            hover:shadow-lg
            active:shadow-inner
            active:translate-y-px
            ${disabled ? 'opacity-50' : 'opacity-100'}
            ${className}
        `}
        >
            {children}
        </button>
    )
}
