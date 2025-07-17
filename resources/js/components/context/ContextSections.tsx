import React, { Children, useContext } from 'react';
import InViewContext from '../../contexts/InViewContext';
import { ContextGroupProps } from './ContextGroup';
import ContextNav from './ContextNav';
import ContextNavGroup from './ContextNavGroup';
import ContextNavItem from './ContextNavItem';
import ContextSection from './ContextSection';

type Props = {
    children: Array<React.ReactElement<ContextGroupProps> | null | false>;
};

export default function ContextSections({ children }: Props) {
    const { inView } = useContext(InViewContext);

    return (
        <>
            <nav className="hidden @2xl:block min-w-[8rem] flex-none mr-10 @4xl:mr-20">
                <div className="sticky top-[7.5rem]">
                    <ContextNav>
                        {Children.map(children, (group) => (
                            <>
                                {group && (
                                    <ContextNavGroup title={group.props.title} anchor={group.props.anchor}>
                                        {Children.map(group.props.children, (section) => (
                                            <>
                                                {section && section.type === ContextSection && (
                                                    <ContextNavItem
                                                        icon={section.props.icon}
                                                        active={inView[inView.length - 1] === section.props.title}
                                                        title={section.props.title}
                                                        anchor={section.props.anchor}
                                                    />
                                                )}
                                            </>
                                        ))}
                                    </ContextNavGroup>
                                )}
                            </>
                        ))}
                    </ContextNav>
                </div>
            </nav>
            <div className="overflow-hidden grid grid-cols-1 gap-px bg-white dark:shadow-none dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 flex-grow">{children}</div>
        </>
    );
}
