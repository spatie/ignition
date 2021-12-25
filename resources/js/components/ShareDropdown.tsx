import React from 'react';

type Props = {
    isOpen: boolean;
};

export default function ShareDropdown({ isOpen }: Props) {
    return (
        <div
            className={`absolute mt-2 top-10 left-1/2 transform -translate-x-6 transition-all duration-150 origin
                 ${isOpen ? '' : 'opacity-0 pointer-events-none scale-90'}`}
        >
            <div className="flex px-4 justify-start">
                <div className="w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown"></div>
            </div>
            <div className="~bg-dropdown px-10 py-8 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h4 className="whitespace-nowrap font-semibold">Share with Flare</h4>
                    <div className="ml-6 text-xs ~text-gray-500">
                        <span className="whitespace-nowrap flex items-center justify-end">
                            <a className="flex items-center underline" href="#">
                                Docs
                                <svg viewBox="0 0 682 1024" className="w-4 h-5 ml-1.5">
                                    <polygon
                                        points="235.3,510.5 21.5,387 21.5,140.2 236.5,264.1 "
                                        style={{ fill: 'rgb(81, 219, 158)' }}
                                    />
                                    <polygon
                                        points="235.3,1004.8 21.5,881.4 21.5,634.5 234.8,757.9 "
                                        style={{ fill: 'rgb(121, 0, 245)' }}
                                    />
                                    <polygon
                                        points="448.9,386.9 21.5,140.2 235.3,16.7 663.2,263.4 "
                                        style={{ fill: 'rgb(148, 242, 200)' }}
                                    />
                                    <polygon
                                        points="234.8,757.9 21.5,634.5 235.3,511 449.1,634.5 "
                                        style={{ fill: 'rgb(164, 117, 244)' }}
                                    />
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
                <ul className="mt-6 grid justify-start gap-3">
                    <li>
                        <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <span className="mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-emerald-300 rounded-full shadow-inner transition-colors"></span>
                            <span className="absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform"></span>
                            <span className="uppercase tracking-wider text-xs font-medium">Stack</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <span className="mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-emerald-300 rounded-full shadow-inner transition-colors"></span>
                            <span className="absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform"></span>
                            <span className="uppercase tracking-wider text-xs font-medium">Context</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <span className="mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-emerald-300 rounded-full shadow-inner transition-colors"></span>
                            <span className="absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform"></span>
                            <span className="uppercase tracking-wider text-xs font-medium">Debug</span>
                        </label>
                    </li>
                </ul>
                <button
                    className="
                                          mt-6
                                          px-4
                                          h-8
                                          bg-violet-500
                                          text-white
                                          whitespace-nowrap
                                          border-b border-gray-500/25
                                          text-xs uppercase tracking-wider
                                          font-bold
                                          rounded-sm
                                          shadow-md
                                          hover:shadow-lg
                                          active:shadow-none
                                      "
                >
                    Create Share
                </button>
            </div>
        </div>
    );
}
