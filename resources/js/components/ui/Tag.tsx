import React from 'react';

type Props = { 
    children: React.ReactNode; 
    className?: string;
    color?: 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'gray' | undefined ;
};

export default function Tag({ children, className = '', color = 'gray' }: Props) {

    const tagColors = {
        red: '~text-red-600 border-red-500/50',
        orange: '~text-orange-600 border-orange-500/50',
        green: '~text-emerald-600 border-emerald-500/50',
        blue: '~text-indigo-600 border-indigo-500/50',
        purple: '~text-violet-600 border-violet-600/50',
        gray: '~text-gray-500 border-gray-500/50',
    }[color];

    return (
        <div className={`${className} ${tagColors} px-1.5 py-0.5 rounded-sm bg-opacity-20 border text-xs font-medium uppercase tracking-wider`}>
            {children}
        </div>
    );
}
