import React, { useEffect } from 'react';

type Props = {
    value: string;
};

export default function SfDump({ value, ...props }: Props) {
    useEffect(() => {
        const match = value.match(/sf-dump-\d+/);

        if (!match) {
            return;
        }

        // @ts-ignore
        window.Sfdump(match[0]);
    }, [value]);

    return <div className="~bg-gray-500/5 px-4 py-2" dangerouslySetInnerHTML={{ __html: value }} {...props} />;
}
