import React from 'react';
import useSectionInView from '../../hooks/useSectionInView';
import ErrorBoundary from "../ui/ErrorBoundary";
import ErrorBoundarySection from "../ui/ErrorBoundarySection";

export type ContextSectionProps = {
    icon?: React.ReactNode;
    title: string;
    children: React.ReactNode;
    anchor: string;
    secondaryTitle?: boolean;
};

export default function ContextSection({icon, title, children, anchor, secondaryTitle = false}: ContextSectionProps) {
    const ref = useSectionInView(title);

    const titleClass = "mb-2 flex items-center gap-2 font-semibold " + (secondaryTitle ? "text-base ~text-gray-600" : "text-lg ~text-indigo-600");

    return (
        <div ref={ref}>
            <a id={`context-${anchor}`} className="scroll-target"/>
            <h1 className={titleClass}>
                {title}
                {(icon) && <span className="opacity-50 ~text-indigo-600 text-sm">{icon}</span>}
            </h1>
            <ErrorBoundary fallbackComponent={(githubLink) => <ErrorBoundarySection githubLink={githubLink} />}>
                {children}
            </ErrorBoundary>
        </div>
    );
}
