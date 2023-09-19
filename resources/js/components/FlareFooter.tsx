import { FlareIcon } from '@flareapp/ignition-ui';
import React from 'react';

export default function FlareFooter() {
    return (
        <footer>
            <div
                className="@container relative isolate overflow-hidden bg-gray-900 py-8 sm:py-20 shadow-2xl rounded-lg px-6 sm:px-24 | flex justify-center">
                <div className="@4xl:grid @4xl:grid-cols-[max-content,12rem] gap-x-16 xl:gap-x-24">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to bottom right,#d4c0ff,#ab90e5)'}}>Flare</span> is your error page for production.
                        </h2>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Start tracking errors in your application within minutes with Flare.<br/>
                            Flare provides exceptional error monitoring designed specifically for Laravel applications.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-start gap-x-6">
                            <a
                                href="https://flareapp.io/?utm_campaign=ignition&utm_source=ignition"
                                target="_blank"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                            <span className="text-sm font-semibold leading-6 py-2 text-white">
                            Use code <code>IGNITION</code> for 50% off your first month.
                        </span>
                        </div>
                    </div>
                    <div className="hidden @4xl:block relative">
                        <FlareIcon className="ml-0 absolute left-0 -top-6 h-[170%] w-auto opacity-90" />
                        <FlareIcon className="ml-0 absolute left-0 -top-6 h-[170%] w-auto opacity-50 blur-[10px]" />
                    </div>
                </div>

                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-0 -top-32 -z-10 h-[75rem] w-[75rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                    aria-hidden="true"
                >
                    <circle cx={512} cy={512} r={512}
                            fill="url(#purple-grad)"
                            fillOpacity="0.6"/>
                    <defs>
                        <radialGradient id="purple-grad">
                            <stop stopColor="#906ED8"/>
                            <stop offset={1} stopColor="#906ED8"/>
                        </radialGradient>
                    </defs>
                </svg>
                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute right-0 -bottom-32 -z-10 h-[75rem] w-[75rem] translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                    aria-hidden="true"
                >
                    <circle cx={512} cy={512} r={512}
                            fill="url(#green-grad)"
                            fillOpacity="0.6"/>
                    <defs>
                        <radialGradient id="green-grad">
                            <stop stopColor="#41D591"/>
                            <stop offset={1} stopColor="#41D591"/>
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </footer>
    )
}
