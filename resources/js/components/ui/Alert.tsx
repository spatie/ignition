import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

type Props = { children: React.ReactNode; className?: string };

export default function Alert({ children, className = '' }: Props) {
    return (
        <div className={`${className}`}>
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 px-4 py-2">
                <div className="flex-shrink-0" aria-hidden="true">
                    <FontAwesomeIcon className="text-yellow-500 " icon={faExclamationTriangle} />
                </div>
                <p className="text-sm">{children}</p>
            </div>
        </div>
    );
}
