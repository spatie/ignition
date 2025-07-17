import React, {Children, useState} from 'react';
import ErrorBoundary from "../ui/ErrorBoundary";
import ErrorBoundarySection from "../ui/ErrorBoundarySection";

type Props = {
    children: Array<React.ReactElement | false>;
    className?: string;
};

type Tab = {
    name: string | React.ReactElement;
    count: number;
    component: React.ComponentType<any>;
};

export default function DebugTabs({ children, className }: Props) {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const validChildren = children.filter((child) => child !== false) as Array<React.ReactElement>;

    const tabs: Array<Tab> = Children.map(validChildren, (child) => {
        return {
            name: child.props.name,
            component: child.props.component,
            count: child.props.count,
            checked: child.props.checked,
            onChange: child.props.onChange,
        };
    }).filter((tab) => tab.count);

    const Tab = tabs[currentTabIndex].component;

    return (
        <div className={`${className} | bg-gray-300/50 dark:bg-black/10 shadow-inner rounded-lg`}>
            <nav className="z-10 flex justify-center items-center">
                <ul className="-my-5 flex justify-start items-center rounded-full shadow-lg bg-indigo-500 text-white space-x-px">
                    {tabs.map((tab, i) => (
                        <li
                            key={i}
                            className={`
                                    ${i === currentTabIndex ? 'bg-indigo-600' : 'bg-indigo-500 text-indigo-100'}
                                    ${i === 0 ? 'rounded-l-full' : ''}
                                    ${i === tabs.length - 1 ? 'rounded-r-full' : ''}
                                    hover:text-white
                                `}
                        >
                            <button
                                onClick={() => setCurrentTabIndex(i)}
                                className="group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium "
                            >
                                <span className="mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/30 text-white rounded-full text-xs">
                                    {tab.count}
                                </span>
                                <span>{tab.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <ErrorBoundary fallbackComponent={(githubLink) =>  <ErrorBoundarySection githubLink={githubLink} className="pt-10"/>}>
                <div className="grid grid-cols-1 gap-10 py-10 px-6 @lg:px-10">
                    <Tab/>
                </div>
            </ErrorBoundary>
        </div>
    );
}

DebugTabs.Tab = (_props: Tab) => null;
