import React from 'react';

type Props = {
    isOpen: boolean;
};

export default function SettingsDropdown({ isOpen }: Props) {
    return (
        <div
            className={`absolute mt-2 top-10 right-1/2 translate-x-6 transition-all duration-150 origin-top-right
                ${isOpen ? '' : 'opacity-0 pointer-events-none scale-90'}\`}
        `}
        >
            <div className="flex px-4 justify-end">
                <div className="w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown"></div>
            </div>
            <div className="~bg-dropdown px-10 py-8 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h4 className="whitespace-nowrap font-semibold">Ignition Settings</h4>
                    <div className="ml-6 text-xs ~text-gray-500">
                        <span className="whitespace-nowrap flex items-center justify-end">
                            <a className="flex items-center underline" href="#">
                                Docs
                                <svg id="ignition" className="w-8 h-8 -ml-1" viewBox="0 0 500 500">
                                    <g>
                                        <polygon
                                            style={{ fill: 'transparent' }}
                                            points="466.5,375 466.5,125 250,0 33.5,125 33.5,375 250,500 	"
                                        />
                                        <g>
                                            <polygon
                                                style={{ fill: '#ff4590' }}
                                                points="314.2,176 314.2,250 250,287 250,212.6 		"
                                            />
                                            <polygon
                                                style={{ fill: '#ffd000' }}
                                                points="185.9,398.1 185.9,324.1 250,287 249.9,360.9 		"
                                            />
                                            <polygon
                                                style={{ fill: '#de075d' }}
                                                points="250,139.1 250,287 185.9,250 185.8,101.9 		"
                                            />
                                            <polygon
                                                style={{ fill: '#e0b800' }}
                                                points="249.9,360.9 250,287 314.1,324 314.1,398.1 		"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
                <h4 className="mt-6 uppercase tracking-wider ~text-gray-500 text-xs font-bold">Editor</h4>
                <div className="mt-2 relative">
                    <select className="block appearance-none w-full ~bg-gray-100 border ~border-gray-200 h-12 px-4 pr-8 rounded-none leading-tight focus:outline-none focus:bg-white">
                        <option>VSCode</option>
                        <option>PHPStorm</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                        <i className="fas fa-angle-down group-hover:text-red-500 text-sm" />
                    </div>
                </div>
                <h4 className="mt-6 uppercase tracking-wider ~text-gray-500 text-xs font-bold">Theme</h4>
                <button
                    id="theme"
                    className="mt-2 w-full ~bg-gray-100 border ~border-gray-200 rounded-none leading-tight"
                >
                    <div
                        className="group flex items-center"
                        style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}
                    >
                        <div className="px-4">
                            <div
                                id="theme-moon"
                                className="h-12 flex items-center origin-bottom transition-transform duration-1000"
                            >
                                <i className="fas fa-moon text-sm ~text-gray-500 group-hover:text-amber-400 transition-colors duration-500" />
                            </div>
                            <div
                                id="theme-sun"
                                className="absolute top-0 left-4 h-12 flex items-center -rotate-180 origin-bottom transition-transform duration-1000"
                            >
                                <i className="fas fa-sun text-sm ~text-gray-500 group-hover:text-amber-400 transition-colors duration-500" />
                            </div>
                        </div>
                        <div id="theme-name" className="-ml-1 first-letter:uppercase">
                            Light
                        </div>
                    </div>
                </button>
                <button
                    className="
                                            mt-6
                                            px-4
                                            h-8
                                            bg-red-500
                                            text-white
                                            whitespace-nowrap
                                            border-b border-red-500/25
                                            text-xs uppercase tracking-wider
                                            font-bold
                                            rounded-sm
                                            shadow-md
                                            hover:shadow-lg
                                            active:shadow-none
                                        "
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
}
