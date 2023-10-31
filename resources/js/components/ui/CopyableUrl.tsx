import React from 'react';
import {CopyButton} from '@flareapp/ignition-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
    url: string;
    helpText: string;
    openText: string;
};

export default function CopyableUrl({url, openText, helpText}: Props) {
    return (
        <div>
            <p className="text-sm mb-1">{helpText}</p>
            <div className="flex gap-3">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline ~text-violet-500 hover:~text-violet-600"
                >
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="opacity-50 text-xs mr-1"/>
                    {openText}
                </a>
                <CopyButton alwaysVisible direction="left" value={url}/>
            </div>
        </div>
    )
}
