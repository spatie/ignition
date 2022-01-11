import React from 'react';
import useSectionInView from '../hooks/useSectionInView';

type Props = {
    children: React.ReactNode;
    className?: string;
    name: string;
};

export default function Section({ children, className = '', name }: Props) {
    const ref = useSectionInView(name);

    return (
        <section ref={ref} className={className}>
            <a id={name} className="scroll-target" />
            {children}
        </section>
    );
}
