import {FlareIcon, IgnitionIcon} from '@flareapp/ignition-ui';
import React from 'react';

export default function Footer() {
    return (
        <footer
            className="mx-auto mb-20 px-6 lg:px-10 max-w-4xl lg:max-w-[90rem] | flex flex-row justify-between gap-4 ~text-gray-500">
            <ul className="grid grid-flow-col gap-5 justify-center items-center uppercase text-xs font-medium">
                <li>
                    <IgnitionIcon/>
                </li>
                <li>·</li>
                <li>
                    <a
                        href="https://github.com/spatie/laravel-ignition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500"
                    >Source</a>
                </li>
                <li>·</li>
                <li>
                    <a
                        href="https://flareapp.io/docs/ignition/introducing-ignition/overview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500"
                    >Docs</a>
                </li>
                <li>·</li>
                <li>
                    <a
                        href="https://laravel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500"
                    >Laravel</a>
                </li>
            </ul>
            <div className="text-sm flex items-center">
                <p>
                Ignition is built by
                <a
                    href="https://flareapp.io/?utm_campaign=ignition&utm_source=ignition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-purple-500"
                >
                    <FlareIcon className={"inline-block -mt-1 ml-1 mr-px"}/>
                    Flare
                </a>,
                the Laravel error reporting service.
                </p>
            </div>
        </footer>
    )
}
