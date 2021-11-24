import React from 'react';
import { ErrorOccurrenceWithFrames, Tabname } from './types';
import OccurrenceTabs from './components/OccurrenceTabs';

import '../../css/app.css';

import AppTab from './components/tabs/AppTab';
import ContextTab from './components/tabs/ContextTab';
import LivewireTab from './components/tabs/LivewireTab';
import DebugTab from './components/tabs/DebugTab';
import RequestTab from './components/tabs/RequestTab';
import StackTab from './components/tabs/StackTab';
import UserTab from './components/tabs/UserTab';
import IconSummary from 'resources/js/shared/components/IconSummary';

type Props = {
    errorOccurrence: ErrorOccurrenceWithFrames;
    manageSharesUrl?: string;
    tabs?: Array<Tabname>;
    hideShareButton?: boolean;
};

export default function ErrorUI({
    errorOccurrence,
    manageSharesUrl,
    tabs = ['stackTraceTab', 'requestTab', 'appTab', 'userTab', 'contextTab', 'debugTab'],
    hideShareButton,
}: Props) {
    return (
        <>
            <IconSummary />

            <OccurrenceTabs
                errorOccurrence={errorOccurrence}
                manageSharesUrl={manageSharesUrl}
                hideShareButton={hideShareButton}
            >
                {tabs.includes('stackTraceTab') && (
                    <OccurrenceTabs.Tab
                        name={
                            <>
                                Stack<span className="hidden sm:inline">&nbsp;trace</span>
                            </>
                        }
                        component={StackTab}
                    />
                )}
                {tabs.includes('requestTab') && <OccurrenceTabs.Tab name="Request" component={RequestTab} />}
                {tabs.includes('contextTab') && errorOccurrence.context_items.hasOwnProperty('livewire') && (
                    <OccurrenceTabs.Tab name="Livewire" component={LivewireTab} />
                )}
                {tabs.includes('appTab') && <OccurrenceTabs.Tab name="App" component={AppTab} />}
                {tabs.includes('userTab') && <OccurrenceTabs.Tab name="User" component={UserTab} />}
                {tabs.includes('contextTab') && <OccurrenceTabs.Tab name="Context" component={ContextTab} />}
                {tabs.includes('debugTab') && <OccurrenceTabs.Tab name="Debug" component={DebugTab} />}
            </OccurrenceTabs>
        </>
    );
}
