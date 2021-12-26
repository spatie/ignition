import React from 'react';
import {CopyButton} from '@flareapp/ignition-ui';

type Props = {
    url: string;
    helpText: string;
    openText: string;
};

export default function CopyableUrl({url, openText, helpText}: Props) {
    return (
        <>
            <p className="mt-4 text-gray-300">{helpText}</p>
            <div className="grid cols-auto items-center justify-start gap-2 mt-2">
                <a
                    href={url}
                    target="_blank"
                    className="button-secondary button-sm bg-tint-600 hover:bg-tint-700 text-white"
                >
                    {openText}
                </a>
                <CopyButton value={url}/>
            </div>
        </>
    )
}
