import React from 'react';
import useSectionInView from '../hooks/useSectionInView';

type Props = {
    children: React.ReactNode;
    name: string;
};

export default function Section({ children, name }: Props) {
    const ref = useSectionInView(name);

    return (
        <section ref={ref} id={name}>
            {children}
        </section>
    );
}
