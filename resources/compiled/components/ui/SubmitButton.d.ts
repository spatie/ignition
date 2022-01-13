import React from 'react';
declare type Props = {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
};
export default function SubmitButton({ children, className, disabled, onClick }: Props): JSX.Element;
export {};
