import React, {useContext} from 'react';
import InViewContext from 'contexts/InViewContext';
import last from 'lodash/last';

type Props = {
    name: string;
    icon?: React.ReactNode;
    iconOpacity?: string;
    href?: null | string;
    important?: boolean;
    children?: React.ReactNode;
    onClick?: (() => void) | null;
    label?: boolean;
    navRef?: React.MutableRefObject<null>;
};

export default function NavBarItem({
    name,
    href = null,
    icon,
    iconOpacity = 'opacity-50', // Allow optical corrections, eg. the thin Laravel icon
    important = false,
    children = null,
    onClick = null,
    label = true,
    navRef
}: Props) {
    const {inView} = useContext(InViewContext);

    const onClickHandler = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <li ref={navRef}>
            <a
                href={href || `#${name}`}
                target={href ? '_blank' : '_self'}
                onClick={onClickHandler}
                rel={href ? 'noopener noreferrer' : ''}
            >
                <button
                    className={`
                    group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium
                    hover:text-red-500
                    ${important ? 'mr-2' : ''}
                    ${last(inView) === name ? 'text-red-500' : ''}
                `}
                >
                    {icon &&
                        <span className={`mr-1.5 ${iconOpacity ?? 'opacity-50'}`} >
                            {icon}
                        </span>
                    }
                    {label && (
                        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    )}
                    {important && <span className="right-2 top-2.5 absolute w-2 h-2 bg-red-500 rounded-full shadow" />}
                </button>
            </a>
            {children}
        </li>
    );
}
