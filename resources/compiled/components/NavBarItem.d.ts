import React from 'react';
declare type Props = {
    name: string;
    icon?: React.ReactNode;
    iconOpacity?: string;
    href?: null | string;
    important?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    label?: boolean;
    navRef?: React.MutableRefObject<null>;
};
export default function NavBarItem({ name, href, icon, iconOpacity, // Allow optical corrections, eg. the thin Laravel icon
important, children, onClick, label, navRef }: Props): JSX.Element;
export {};
