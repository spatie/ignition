import React, { useState } from 'react';

type Props = {
    message: string;
    className?: string;
};

export default function ExceptionMessage({ message, className = '' }: Props) {
    const [fullException, setFullException] = useState<boolean>(false);

    function handleClick() {
        // Ignore click even when selecting expanded text.
        if ((fullException && window.getSelection()?.toString().length) || 0 > 0) {
            return;
        }

        setFullException(!fullException);
    }

    return (
        <div
            className={`
                my-4 font-semibold leading-snug text-xl
                ${className}
            `}
            onClick={handleClick}
        >
            <div className={fullException ? 'line-clamp-none' : 'line-clamp-2'}>{message}</div>
        </div>
    );
}
