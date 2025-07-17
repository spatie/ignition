import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ContextNav({children}: Props) {
    return (
        <ul className="grid grid-cols-1 gap-10">
            {children}
        </ul>
    )
}
