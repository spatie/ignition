import React, { useState } from 'react';
import CodeSnippet from './CodeSnippet';
import { jsonStringify } from '../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};

export default function DefinitionList({ children, className = '', ...props }: Props) {
    if (!children) {
        return null;
    }

    return (
        <dl className={`grid grid-cols-1 gap-2 ${className}`} {...props}>
            {children}
        </dl>
    );
}

DefinitionList.Row = DefinitionListRow;

type Value = string | React.ReactNode | Array<any> | Object | boolean | number;

type DefinitionListRowProps = {
    value?: Value;
    label?: string | React.ReactNode;
    className?: string;
    stacked?: boolean;
    type?: string;
    small?: boolean;
};

function DefinitionListRow({ value = '', label = '', className = '', stacked = false, type, small = false }: DefinitionListRowProps) {
    let valueOutput = value;
    const [expandLabel, setExpandLabel] = useState(false);

    let timeout: NodeJS.Timeout;

    function startExpandLabel() {
        timeout = setTimeout(() => setExpandLabel(true), 500);
    }

    function stopExpandLabel() {
        clearTimeout(timeout);
        setExpandLabel(false);
    }

    if (React.isValidElement(value)) {
        valueOutput = value;
    } else if (typeof value === 'boolean') {
        valueOutput = (
            <span
                className={`${
                    value ? 'text-emerald-500 bg-emerald-500/5' : 'text-red-500 bg-red-800/5'
                } text-sm px-3 py-2 inline-flex gap-2 items-center justify-center`}
            >
                <FontAwesomeIcon
                    className={`${value} ? 'text-emerald-500' : 'text-red-500`}
                    icon={value ? faCheck : faTimes}
                />
                <span className="font-mono">{value ? 'true' : 'false'}</span>
            </span>
        );
    } else if (type === 'string' || typeof value === 'object') {
        valueOutput = <CodeSnippet value={jsonStringify(value)} language="json" />;
    } else if (typeof value === 'string') {
        valueOutput = <CodeSnippet value={value} />;
    } else if (typeof value === 'number') {
        valueOutput = <CodeSnippet value={String(value)} />;
    }

    const expandedLabelClass = 'flex-grow truncate min-w-[8rem] max-w-max';
    const expandedSmallLabelClass = 'flex-grow truncate min-w-[2rem] max-w-max';
    const normalLabelClass = 'flex-none truncate w-[8rem]';
    const normalSmallLabelClass = 'flex-none truncate w-[2rem]';

    return (
        <div className={`${stacked ? 'flex flex-col' : `flex items-baseline ${small ? 'gap-3' : 'gap-10'}`}  ${className}`}>
            <dt
                className={`
                ${
                    stacked
                        ? 'self-start pt-2 pb-1.5 leading-tight'
                        : expandLabel
                            ? (small ? expandedSmallLabelClass : expandedLabelClass)
                            : (small ? normalSmallLabelClass : normalLabelClass)
                }
            `}
                onMouseOver={() => {
                    startExpandLabel();
                }}
                onMouseOut={() => {
                    stopExpandLabel();
                }}
            >
                {label}
            </dt>
            <dd className="flex-grow min-w-0">{valueOutput as React.ReactNode}</dd>
        </div>
    );
}
