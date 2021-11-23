import React from 'react';

export default function NavBar() {
    return (
        <nav className='z-50 fixed top-0 h-20 w-full'>
            <div className='relative'>
                <div id='navbar'
                     className='z-10 transform translate-x-0 ~bg-body transition-color duration-100'>
                    <div
                        className='h-10 flex justify-between px-6 lg:px-10 2xl:px-20 mx-auto max-w-4xl lg:max-w-[90rem] 2xl:max-w-none'>
                        <ul className='-ml-3 sm:-ml-5 grid grid-flow-col justify-start items-center'>
                            <li>
                                <a href='#stack'>
                                    <button
                                        className='group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium'>
                                        <i className='mr-0.5 fas fa-code text-gray-400 group-hover:text-red-500' />
                                        <span className='group-hover:text-red-500'>Stack</span>
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a href='#context'>
                                    <button
                                        className='group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium'>
                                        <i className='mr-0.5 fas fa-info-circle text-gray-400 group-hover:text-red-500' />
                                        <span className='group-hover:text-red-500'>Context</span>
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a href='#debug'>
                                    <button
                                        className='group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium'>
                                        <i className='mr-0.5 fas fa-bug text-gray-400 group-hover:text-red-500' />
                                        <span className='group-hover:text-red-500'>Debug</span>
                                        <span
                                            className='right-2 top-2.5 absolute w-2 h-2 bg-red-500 rounded-full shadow' />
                                    </button>
                                </a>
                            </li>
                            <li className='flex items-center'>
                                <button id='navbar-share'
                                        className='group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium'>
                                    <i className='mr-0.5 fas fa-share text-gray-400 group-hover:text-red-500' />
                                    <span className='group-hover:text-red-500'>Share</span>
                                </button>
                                <div id='navbar-share-dropdown'
                                     className='opacity-0 pointer-events-none absolute mt-2 top-10 left-1/2 transform -translate-x-6 transition-all duration-150 scale-90 origin'>
                                    <div className='flex px-4 justify-start'>
                                        <div
                                            className='w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown'>
                                        </div>
                                    </div>
                                    <div className='~bg-dropdown px-10 py-8 shadow-2xl'>
                                        <div className='flex items-center justify-between'>
                                            <h4 className='whitespace-nowrap font-semibold'>
                                                Share with Flare
                                            </h4>
                                            <div className='ml-6 text-xs ~text-gray-500'>
                                                <span
                                                    className='whitespace-nowrap flex items-center justify-end'>
                                                    <a className='flex items-center underline' href="#">
                                                        Docs
                                                        <svg viewBox='0 0 682 1024'
                                                             className='w-4 h-5 ml-1.5'>
                                                            <polygon
                                                                points='235.3,510.5 21.5,387 21.5,140.2 236.5,264.1 '
                                                                style={{ fill: 'rgb(81, 219, 158)' }} />
                                                            <polygon
                                                                points='235.3,1004.8 21.5,881.4 21.5,634.5 234.8,757.9 '
                                                                style={{ fill: 'rgb(121, 0, 245)' }} />
                                                            <polygon
                                                                points='448.9,386.9 21.5,140.2 235.3,16.7 663.2,263.4 '
                                                                style={{ fill: 'rgb(148, 242, 200)' }} />
                                                            <polygon
                                                                points='234.8,757.9 21.5,634.5 235.3,511 449.1,634.5 '
                                                                style={{ fill: 'rgb(164, 117, 244)' }} />
                                                        </svg>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <ul className='mt-6 grid justify-start gap-3'>
                                            <li>
                                                <label className='flex items-center'>
                                                    <input type='checkbox' defaultChecked
                                                           className='sr-only peer' />
                                                    <span
                                                        className='mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-green-300 rounded-full shadow-inner transition-colors'>
                                                    </span>
                                                    <span
                                                        className='absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform'>
                                                    </span>
                                                    <span
                                                        className='uppercase tracking-wider text-xs font-medium'>Stack
                                                    </span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className='flex items-center'>
                                                    <input type='checkbox' defaultChecked
                                                           className='sr-only peer' />
                                                    <span
                                                        className='mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-green-300 rounded-full shadow-inner transition-colors'>
                                                    </span>
                                                    <span
                                                        className='absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform'>
                                                    </span>
                                                    <span
                                                        className='uppercase tracking-wider text-xs font-medium'>
                                                        Context
                                                    </span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className='flex items-center'>
                                                    <input type='checkbox' defaultChecked
                                                           className='sr-only peer' />
                                                    <span
                                                        className='mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-green-300 rounded-full shadow-inner transition-colors'>
                                                    </span>
                                                    <span
                                                        className='absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform'>
                                                    </span>
                                                    <span
                                                        className='uppercase tracking-wider text-xs font-medium'>Debug
                                                    </span>
                                                </label>
                                            </li>
                                        </ul>
                                        <button className='
                                          mt-6
                                          px-4
                                          h-8
                                          bg-purple-500
                                          text-white
                                          whitespace-nowrap
                                          border-b border-gray-500/25
                                          text-xs uppercase tracking-wider
                                          font-bold
                                          rounded-sm
                                          shadow-md
                                          hover:shadow-lg
                                          active:shadow-none
                                      '>
                                            Create Share
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul className='-mr-3 sm:-mr-5 grid grid-flow-col justify-end items-center'>
                            <li className='flex items-center'>
                                <button
                                    className='group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium'>
                                    <i className='mr-0.5 fab fa-laravel text-sm ~text-gray-500 group-hover:text-red-500' />
                                    <span className='group-hover:text-red-500'>Docs</span>
                                    <span
                                        className='right-2 top-2.5 absolute w-2 h-2 bg-red-500 rounded-full shadow' />
                                </button>
                            </li>
                            {/* <li class="flex items-center">
                  <button class="group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium">
                      <i class="mr-1 fab fa-github ~text-gray-500 group-hover:text-red-500"></i>
                      GitHub
                  </button>
              </li> */}
                            <li className='flex items-center'>
                                <button id='navbar-settings'
                                        className='group px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium'>
                                    <i className='mr-0.5 fas fa-cog text-sm ~text-gray-500 group-hover:text-red-500' />
                                </button>
                                <div id='navbar-settings-dropdown'
                                     className='opacity-0 pointer-events-none absolute mt-2 top-10 right-1/2 transform translate-x-6 transition-all duration-150 scale-90 origin-top-right'>
                                    <div className='flex px-4 justify-end'>
                                        <div
                                            className='w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown'>
                                        </div>
                                    </div>
                                    <div className='~bg-dropdown px-10 py-8 shadow-2xl'>
                                        <div className='flex items-center justify-between'>
                                            <h4 className='whitespace-nowrap font-semibold'>
                                                Ignition Settings
                                            </h4>
                                            <div className='ml-6 text-xs ~text-gray-500'>
                                                <span
                                                    className='whitespace-nowrap flex items-center justify-end'>
                                                    <a className='flex items-center underline' href="#">
                                                        Docs
                                                        <svg id='ignition' className='w-8 h-8 -ml-1'
                                                             viewBox='0 0 500 500'>
                                                            <g>
                                                                <polygon style={{ fill: 'transparent' }}
                                                                         points='466.5,375 466.5,125 250,0 33.5,125 33.5,375 250,500 	' />
                                                                <g>
                                                                    <polygon style={{ fill: '#ff4590' }}
                                                                             points='314.2,176 314.2,250 250,287 250,212.6 		' />
                                                                    <polygon style={{ fill: '#ffd000' }}
                                                                             points='185.9,398.1 185.9,324.1 250,287 249.9,360.9 		' />
                                                                    <polygon style={{ fill: '#de075d' }}
                                                                             points='250,139.1 250,287 185.9,250 185.8,101.9 		' />
                                                                    <polygon style={{ fill: '#e0b800' }}
                                                                             points='249.9,360.9 250,287 314.1,324 314.1,398.1 		' />
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <h4 className='mt-6 uppercase tracking-wider ~text-gray-500 text-xs font-bold'>
                                            Editor</h4>
                                        <div className='mt-2 relative'>
                                            <select
                                                className='block appearance-none w-full ~bg-gray-100 border ~border-gray-200 h-12 px-4 pr-8 rounded-none leading-tight focus:outline-none focus:bg-white'>
                                                <option>VSCode</option>
                                                <option>PHPStorm</option>
                                            </select>
                                            <div
                                                className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4'>
                                                <i className='fas fa-angle-down group-hover:text-red-500 text-sm' />
                                            </div>
                                        </div>
                                        <h4 className='mt-6 uppercase tracking-wider ~text-gray-500 text-xs font-bold'>
                                            Theme</h4>
                                        <button id='theme'
                                                className='mt-2 w-full ~bg-gray-100 border ~border-gray-200 rounded-none leading-tight'>
                                            <div className='group flex items-center'
                                                 style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
                                                <div className='px-4'>
                                                    <div id='theme-moon'
                                                         className='h-12 flex items-center transform origin-bottom transition-transform duration-1000'>
                                                        <i className='fas fa-moon text-sm ~text-gray-500 group-hover:text-yellow-400 transition-colors duration-500' />
                                                    </div>
                                                    <div id='theme-sun'
                                                         className='absolute top-0 left-4 h-12 flex items-center transform -rotate-180 origin-bottom transition-transform duration-1000'>
                                                        <i className='fas fa-sun text-sm ~text-gray-500 group-hover:text-yellow-400 transition-colors duration-500' />
                                                    </div>
                                                </div>
                                                <div id='theme-name' className='-ml-1 first-letter:uppercase'>
                                                    Light
                                                </div>
                                            </div>
                                        </button>
                                        <button className='
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
                                        '>
                                            Save Settings
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id='navbar-exception' className='absolute top-0 left-0 w-full
                    ~bg-gray-100 border-b ~border-gray-200
                    transform
                    transition-nav
                    duration-300
                '>
                    <div className='
                        px-6 lg:px-10 2xl:px-20 mx-auto max-w-4xl lg:max-w-[90rem] 2xl:max-w-none
                        h-10 flex items-center justify-start
                        border-t  ~border-gray-200
                    '>
                        <div className='font-semibold min-w-0 truncate'>
                            <a href='#top' className='hover:text-red-500'>
                                SQLSTATE[42S02]: Base table or view not found: 1146 Table 'products' doesn't
                                exist
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
