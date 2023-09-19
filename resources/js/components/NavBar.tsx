import React, { useContext, useState, useRef, useEffect } from 'react';
import NavBarItem from 'components/NavBarItem';
import ShareDropdown from 'components/ShareDropdown';
import SettingsDropdown from 'components/SettingsDropdown';
import { ErrorOccurrence, ErrorOccurrenceContext, hasDebugInfo, IgnitionConfigContext } from '@flareapp/ignition-ui';
import useHasScrolled from 'hooks/useHasScrolled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faShare, faCog, faAlignLeft, faExpand, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faLaravel, faPhp } from '@fortawesome/free-brands-svg-icons';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';

type Props = { showException: boolean };

function useClickOutsideListener(ref: React.MutableRefObject<any>, handler: () => void) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
}

function resolveDocs(
    errorOccurrence: ErrorOccurrence,
): null | { type: 'generic' | 'php' | 'laravel'; url: string; tailored: boolean } {
    if (!!errorOccurrence.context_items.env?.laravel_version) {
        const laravelDocs = errorOccurrence.documentation_links.find((link) => link.startsWith('https://laravel.com/'));

        if (laravelDocs) {
            return {
                type: 'laravel',
                url: laravelDocs,
                tailored: true,
            };
        } else {
            return {
                type: 'laravel',
                url: 'https://laravel.com/docs/',
                tailored: false,
            };
        }
    }

    const phpDocs = errorOccurrence.documentation_links.find((link) => link.startsWith('https://php.net/'));
    if (phpDocs) {
        return {
            type: 'php',
            url: phpDocs,
            tailored: true,
        };
    }

    return {
        type: 'generic',
        url: 'https://php.net/docs',
        tailored: false,
    };
}

export default function NavBar({ showException }: Props) {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
    const hasScrolled = useHasScrolled({ distance: 10 });
    const { ignitionConfig } = useContext(IgnitionConfigContext);

    const shareRef = useRef(null);
    const settingsRef = useRef(null);

    useClickOutsideListener(shareRef, () => setIsShareDropdownOpen(false));
    useClickOutsideListener(settingsRef, () => setIsSettingsDropdownOpen(false));

    const env = mapValues(keyBy(errorOccurrence.context_items['env'] || [], 'name'), 'value');

    const showEnvWarning = env.app_env !== 'local' && env.app_debug;

    const docs = resolveDocs(errorOccurrence);

    return (
        <nav className="z-50 fixed top-0 h-20 w-full">
            <div>
                <div
                    className={`
                        ${hasScrolled ? '~bg-gray-100' : '~bg-body'}
                        z-10 transform translate-x-0 transition-color duration-100
                    `}
                >
                    <div className="h-10 flex justify-between px-6 lg:px-10 mx-auto max-w-4xl lg:max-w-[90rem]">
                        <ul className="-ml-3 sm:-ml-5 grid grid-flow-col justify-start items-center">
                            <NavBarItem name="stack" icon={<FontAwesomeIcon icon={faAlignLeft} />} />
                            <NavBarItem name="context" icon={<FontAwesomeIcon icon={faExpand} />} />
                            {hasDebugInfo(errorOccurrence) && (
                                <NavBarItem
                                    name="debug"
                                    icon={<FontAwesomeIcon icon={faBug} />}
                                    important={!!errorOccurrence.context_items.dumps?.length}
                                />
                            )}

                            <NavBarItem
                                name="flare"
                                href="https://flareapp.io/?utm_campaign=ignition&utm_source=ignition"
                                icon={<svg viewBox="0 0 36 56" fill="currentColor" className="h-[.9rem] -top-[.1rem] inline-block">
                                    <path d="M 11.995 55.987 L 0 48.993 L 0 35 L 11.967 41.994 L 11.995 55.987 Z"/>
                                    <path d="M 11.967 41.993 L 0 34.999 L 11.995 28 L 23.989 34.999 L 11.967 41.993 Z"/>
                                    <path d="M 11.995 27.987 L 0 20.987 L 0 7 L 12.062 14.022 L 11.995 27.987 Z"/>
                                    <path d="M 23.978 20.981 L 0 6.999 L 11.995 0 L 36 13.981 L 23.978 20.981 Z"/>
                                </svg>}
                            />
                        </ul>
                        <ul className="-mr-3 sm:-mr-5 grid grid-flow-col justify-end items-center">
                            {ignitionConfig.enableShareButton && (
                                <NavBarItem
                                    navRef={shareRef}
                                    name="share"
                                    icon={<FontAwesomeIcon icon={faShare} />}
                                    onClick={() => {
                                        setIsShareDropdownOpen(!isShareDropdownOpen);
                                    }}
                                >
                                    <ShareDropdown isOpen={isShareDropdownOpen} />
                                </NavBarItem>
                            )}

                            {docs && (
                                <NavBarItem
                                    name="docs"
                                    href={docs.url}
                                    icon={
                                        <FontAwesomeIcon
                                            className="text-sm"
                                            icon={docs.type === 'laravel' ? faLaravel : faPhp}
                                        />
                                    }
                                    important={docs.tailored}
                                />
                            )}

                            <NavBarItem
                                navRef={settingsRef}
                                name="settings"
                                icon={<FontAwesomeIcon className="text-sm" icon={faCog} />}
                                iconOpacity="opacity-80"
                                label={false}
                                onClick={() => {
                                    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
                                }}
                            >
                                <SettingsDropdown isOpen={isSettingsDropdownOpen} />
                            </NavBarItem>
                        </ul>
                    </div>
                </div>

                <div
                    className={`
                        ${hasScrolled ? 'shadow-lg' : ''}
                        ${showException ? 'translate-y-10 ~bg-gray-100' : 'translate-y-0 ~bg-body'}
                        absolute top-0 left-0 w-full
                        ~bg-gray-100 border-b ~border-gray-200
                        transform
                        transition-animation
                        duration-300
                    `}
                >
                    <div className="flex items-center px-6 lg:px-10 mx-auto max-w-4xl lg:max-w-[90rem] h-10 border-t ~border-gray-200">
                        <a href="#top" className="min-w-0 inline-flex items-center justify-start gap-2">
                            {showEnvWarning && (
                                <FontAwesomeIcon
                                    title="You have a security issue"
                                    icon={faShieldAlt}
                                    className="text-red-500"
                                />
                            )}
                            <div className="font-semibold min-w-0 truncate hover:text-red-500">
                                {errorOccurrence.exception_message}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
