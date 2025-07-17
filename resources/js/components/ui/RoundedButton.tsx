
import React, { ButtonHTMLAttributes } from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function RoundedButton({ children, className = '', ...props }: Props) {
    return (
        <button
            type={props.type || 'button'}
            className={`w-6 h-6 rounded-full flex items-center justify-center
            text-xs ~bg-white text-indigo-500 hover:~text-indigo-600 
            transform transition-animation shadow-md hover:shadow-lg
            active:shadow-sm active:translate-y-px"
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
        
    );
}


