import React from 'react';
import CodeSnippet from './CodeSnippet';
import { jsonStringify } from '../../util';

type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | React.ReactNodeArray;
};

export default function UnorderedList({ children, className = '', ...props }: Props) {
    return (
        <>
            {children && (
                <ul className={`gap-y-2 flex flex-col ${className}`} {...props}>
                    {children}
                </ul>
            )}
        </>
    );
}

UnorderedList.Item = UnorderedListItem;

type Value = string | React.ReactNode | Array<any> | Object;

type UnorderedListItemProps = {
    value?: Value;
};

function UnorderedListItem({ value = '' }: UnorderedListItemProps) {
    let valueOutput = value;

    if (React.isValidElement(value)) {
        valueOutput = value;
    } else if (typeof value === 'object') {
        valueOutput = <CodeSnippet value={jsonStringify(value)} language="json" />;
    } else if (typeof value === 'string') {
        valueOutput = <CodeSnippet value={value} />;
    }

    return <li>{valueOutput as React.ReactNode}</li>;
}
