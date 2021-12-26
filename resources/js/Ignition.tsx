import React from 'react';
import InViewContextProvider from "contexts/InViewContextProvider";
import NavBar from "components/NavBar";
import Section from "components/Section";
import {IgniteDataContext} from "contexts/IgniteDataContext";
import {ErrorOccurrence, StackTrace, Context, Debug, ErrorOccurrenceContext, ErrorCard} from '@flareapp/ignition-ui';
import {IgniteData} from "./types";
import {useInView} from 'react-intersection-observer';

type Props = {
    errorOccurrence: ErrorOccurrence;
    igniteData: IgniteData;
}

export default function Ignition({errorOccurrence, igniteData}: Props) {
    const {ref: intersectionRef, inView: errorCardInView} = useInView({
        rootMargin: '-40px 0px 0px 0px',
        threshold: 0.3,
        initialInView: true,
    });

    return (
        <IgniteDataContext.Provider value={igniteData}>
            <ErrorOccurrenceContext.Provider value={errorOccurrence}>
                <InViewContextProvider>
                    <NavBar showException={!errorCardInView}/>

                    <main
                        id="top"
                        className="mx-auto mb-20 px-6 lg:px-10 2xl:px-20 max-w-4xl lg:max-w-[90rem] 2xl:max-w-none grid grid-cols-1 2xl:grid-cols-2 2xl:gap-x-20"
                    >
                        <div ref={intersectionRef}>
                            <ErrorCard/>
                        </div>

                        <Section name="stack" children={<StackTrace/>}/>

                        <Section name="context" children={<Context/>}/>

                        <Section name="debug" children={<Debug/>}/>
                    </main>
                </InViewContextProvider>
            </ErrorOccurrenceContext.Provider>
        </IgniteDataContext.Provider>
    )
}
