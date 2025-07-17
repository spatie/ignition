import React, { ButtonHTMLAttributes } from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SmallButton({ children, className = '', ...props }: Props) {
    return (
        <button
            type={props.type || 'button'}
            className={`group inline-flex gap-2 items-center h-6 px-2 rounded-sm ~bg-white shadow text-xs font-medium whitespace-nowrap
            transform
            transition-animation
            hover:shadow-md
            active:shadow-inner
            active:translate-y-px
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
        
    );
}


