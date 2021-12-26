import React, {useContext, useState} from 'react';
import NavBarItem from 'components/NavBarItem';
import ShareDropdown from 'components/ShareDropdown';
import SettingsDropdown from 'components/SettingsDropdown';
import {ErrorOccurrenceContext} from '@flareapp/ignition-ui';
import useHasScrolled from "hooks/useHasScrolled";

type Props = { showException: boolean };

export default function NavBar({showException}: Props) {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
    const hasScrolled = useHasScrolled({distance: 10});

    function toggleShare() {
        setIsSettingsDropdownOpen(false);
        setIsShareDropdownOpen(!isShareDropdownOpen);
    }

    function toggleSettings() {
        setIsShareDropdownOpen(false);
        setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
    }

    return (
        <nav className="z-50 fixed top-0 h-20 w-full">
            <div className="relative">
                <div
                    className={`
                        ${hasScrolled ? '~bg-gray-100' : '~bg-body'}
                        z-10 transform translate-x-0 transition-color duration-100
                    `}
                >
                    <div
                        className="h-10 flex justify-between px-6 lg:px-10 2xl:px-20 mx-auto max-w-4xl lg:max-w-[90rem] 2xl:max-w-none"
                    >
                        <ul className="-ml-3 sm:-ml-5 grid grid-flow-col justify-start items-center">
                            <NavBarItem name="stack" icon="fas fa-code"/>
                            <NavBarItem name="context" icon="fas fa-info-circle"/>
                            <NavBarItem name="debug" icon="fas fa-info-bug" important/>
                            <NavBarItem name="share" icon="fas fa-share" onClick={toggleShare}>
                                <ShareDropdown isOpen={isShareDropdownOpen}/>
                            </NavBarItem>
                        </ul>
                        <ul className="-mr-3 sm:-mr-5 grid grid-flow-col justify-end items-center">
                            <NavBarItem name="docs" href="https://laravel.com/docs" icon="fab fa-laravel" important/>
                            <NavBarItem name="settings" icon="fas fa-cog" label={false} onClick={toggleSettings}>
                                <SettingsDropdown isOpen={isSettingsDropdownOpen}/>
                            </NavBarItem>

                            {/* <li class="flex items-center">
                  <button class="group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium">
                      <i class="mr-1 fab fa-github ~text-gray-500 group-hover:text-red-500"></i>
                      GitHub
                  </button>
              </li> */}
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
                        transition-nav
                        duration-300
                    `}
                >
                    <div
                        className="
                        px-6 lg:px-10 2xl:px-20 mx-auto max-w-4xl lg:max-w-[90rem] 2xl:max-w-none
                        h-10 flex items-center justify-start
                        border-t ~border-gray-200"
                    >
                        <div className="font-semibold min-w-0 truncate">
                            <a href="#top" className="hover:text-red-500">
                                {errorOccurrence.exception_message}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
