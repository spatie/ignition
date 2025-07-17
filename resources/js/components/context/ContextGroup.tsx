import React from 'react';
import ErrorBoundary from "../ui/ErrorBoundary";
import ErrorBoundarySection from "../ui/ErrorBoundarySection";

export type ContextGroupProps = {
    title: string;
    children: Array<React.ReactElement | null | false>;
    anchor: string;
};

export default function ContextGroup({ title, children, anchor }: ContextGroupProps) {
    return (
        <section className="py-10 ~bg-white px-6 @lg:px-10 min-w-0">
            <a id={`context-${anchor}`} className="scroll-target" />
            <h2 className="font-bold text-xs ~text-gray-500 uppercase tracking-wider">
                {title}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-10">
                <ErrorBoundary fallbackComponent={(githubLink) => <ErrorBoundarySection githubLink={githubLink} />}>
                    {children}
                </ErrorBoundary>
            </div>
        </section>
    );
}
