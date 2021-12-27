import React, { useContext } from 'react';
import InViewContext from 'contexts/InViewContext';
import noop from 'lodash/noop';
import last from 'lodash/last';

type Props = {
    name: string;
    icon: string;
    href?: null | string;
    important?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    label?: boolean;
};

export default function NavBarItem({
    name,
    href = null,
    icon,
    important = false,
    children = null,
    onClick = noop,
    label = true,
}: Props) {
    const { inView } = useContext(InViewContext);

    return (
        <li>
            <a href={href || `#${name}`} target={href ? '_blank' : '_self'} onClick={onClick}>
                <button
                    className={`
                    group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium
                    ${last(inView) === name ? 'text-red-500' : ''}
                `}
                >
                    <i className={`mr-0.5 group-hover:text-red-500 text-gray-400 ${icon}`} />
                    {label && (
                        <span className="group-hover:text-red-500">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    )}
                    {important && <span className="right-2 top-2.5 absolute w-2 h-2 bg-red-500 rounded-full shadow" />}
                </button>
            </a>
            {children}
        </li>
    );
}
