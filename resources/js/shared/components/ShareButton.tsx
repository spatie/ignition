import React, { useState } from 'react';
import Downshift from 'downshift';
import { ErrorOccurrence, SharePostData, Tabname } from '../types';
import Button from 'resources/js/shared/components/Button';
import CheckboxField from 'resources/js/shared/components/CheckboxField';
import Icon from 'resources/js/shared/components/Icon';
import { copyToClipboard } from 'resources/js/shared/util';

type Props = {
    children: React.ReactChild | Array<React.ReactChild>;
    errorOccurrence: ErrorOccurrence;
    disabled?: boolean;
    manageSharesUrl?: string;
};

export default function ShareButton({ children, errorOccurrence, disabled = false, manageSharesUrl }: Props) {
    const [sharedUrl, setSharedUrl] = useState<
        { type: 'ignition'; owner_url: string; public_url: string } | { type: 'flare'; url: string } | null
    >(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [selectedTabs, setSelectedTabs] = useState<Array<{ name: Tabname; prettyName: string; selected: boolean }>>([
        { name: 'stackTraceTab', prettyName: 'Stack trace', selected: true },
        { name: 'requestTab', prettyName: 'Request', selected: true },
        { name: 'appTab', prettyName: 'App', selected: true },
        { name: 'userTab', prettyName: 'User', selected: true },
        { name: 'contextTab', prettyName: 'Context', selected: true },
        { name: 'debugTab', prettyName: 'Debug', selected: true },
    ]);

    function toggleTabSelected(
        tabName: 'stackTraceTab' | 'requestTab' | 'appTab' | 'userTab' | 'contextTab' | 'debugTab',
    ) {
        const tab = selectedTabs.find((tab) => tab.name === tabName);

        if (tab) {
            setSelectedTabs(
                selectedTabs.map((tab) => (tab.name === tabName ? { ...tab, selected: !tab.selected } : tab)),
            );
        }
    }

    async function onShareError() {
        const endpoint = errorOccurrence.links.share;

        const selectedTabNames = selectedTabs
            .filter((selectedTab) => selectedTab.selected)
            .map((selectedTab) => selectedTab.name);

        const data: SharePostData = { selectedTabNames, tabs: selectedTabNames, lineSelection: window.location.hash };

        if (window.shareableReport) {
            (data as any).report = window.shareableReport;
        }

        setIsLoading(true);

        try {
            const response = await (
                await fetch(endpoint, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'x-xsrf-token': getCsrfToken(),
                    },
                    credentials: 'include',
                })
            ).json();

            // flare
            if (response && response.shared_error && response.shared_error.links && response.shared_error.links.show) {
                setSharedUrl({ type: 'flare', url: response.shared_error.links.show });
            }

            // ignition
            if (response && response.owner_url && response.public_url) {
                const { owner_url, public_url } = response;
                setSharedUrl({ type: 'ignition', owner_url, public_url });
            }
        } catch (error) {
            setError('Something went wrong while sharing, please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Downshift>
            {({ getItemProps, getMenuProps, getLabelProps, isOpen, toggleMenu }) => (
                <div>
                    <label {...getLabelProps({ className: 'hidden', htmlFor: undefined })}>Share options menu</label>

                    <div>
                        <button
                            disabled={disabled}
                            className={`tab flex items-center ${isOpen ? 'tab-active' : ''}`}
                            onClick={() => toggleMenu()}
                        >
                            {children}
                            <Icon name="share" className="ml-2" />
                        </button>
                        {isOpen && (
                            <ul
                                {...getMenuProps()}
                                className="dropdown z-10 right-0 top-full bg-gray-700 text-white p-4 overflow-visible"
                                style={{ minWidth: '18rem', marginRight: '-1px' }}
                            >
                                <div className="flex mb-3">
                                    <svg viewBox="0 0 682 1024" className="w-4 h-5 mr-2">
                                        <polygon
                                            points="235.3,510.5 21.5,387 21.5,140.2 236.5,264.1 "
                                            style={{ fill: 'rgb(81, 219, 158)' }}
                                        ></polygon>
                                        <polygon
                                            points="235.3,1004.8 21.5,881.4 21.5,634.5 234.8,757.9 "
                                            style={{ fill: 'rgb(121, 0, 245)' }}
                                        ></polygon>
                                        <polygon
                                            points="448.9,386.9 21.5,140.2 235.3,16.7 663.2,263.4 "
                                            style={{ fill: 'rgb(148, 242, 200)' }}
                                        ></polygon>
                                        <polygon
                                            points="234.8,757.9 21.5,634.5 235.3,511 449.1,634.5 "
                                            style={{ fill: 'rgb(164, 117, 244)' }}
                                        ></polygon>
                                    </svg>

                                    <h5 className="text-left font-semibold uppercase tracking-wider whitespace-nowrap">
                                        Share publicly
                                    </h5>

                                    <a
                                        title="Flare documentation underline"
                                        target="_blank"
                                        href="https://flareapp.io/docs/ignition-for-laravel/sharing-errors"
                                        className="ml-auto underline"
                                    >
                                        Docs
                                    </a>
                                </div>

                                {!sharedUrl && (
                                    <>
                                        <div className="grid grid-cols-2 justify-start gap-x-6 gap-y-2">
                                            {selectedTabs.map(({ selected, name, prettyName }) => (
                                                <CheckboxField
                                                    {...getItemProps({ item: name, key: name })}
                                                    labelClassName="text-gray-200 hover:text-white"
                                                    onChange={() =>
                                                        toggleTabSelected(
                                                            name as
                                                                | 'stackTraceTab'
                                                                | 'requestTab'
                                                                | 'appTab'
                                                                | 'userTab'
                                                                | 'contextTab'
                                                                | 'debugTab',
                                                        )
                                                    }
                                                    checked={selected}
                                                    label={prettyName}
                                                />
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-auto grid-flow-col justify-between items-center mt-3">
                                            <Button
                                                secondary
                                                className={`${isLoading ? 'opacity-50' : ''} bg-tint-600 text-white`}
                                                size="sm"
                                                disabled={isLoading}
                                                onClick={onShareError}
                                            >
                                                Share
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {sharedUrl?.type === 'flare' && (
                                    <div className="mt-3">
                                        <Url
                                            url={sharedUrl.url}
                                            helpText="Share your error with others:"
                                            openText="Open share"
                                        />
                                    </div>
                                )}

                                {sharedUrl?.type === 'ignition' && (
                                    <div className="mt-3">
                                        <Url
                                            url={sharedUrl.public_url}
                                            helpText="Share your error with others:"
                                            openText="Open public share"
                                        />
                                        <Url
                                            url={sharedUrl.owner_url}
                                            helpText="Administer your shared error here:"
                                            openText="Open share admin"
                                        />
                                    </div>
                                )}

                                {manageSharesUrl && (
                                    <div className="mt-2">
                                        <a
                                            className="link-dimmed-invers underline"
                                            target="_blank"
                                            href={manageSharesUrl}
                                        >
                                            Manage shares
                                        </a>
                                    </div>
                                )}

                                {error && <p className="mt-3 text-red-400">{error}</p>}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </Downshift>
    );
}

function Url({ url, helpText, openText }: { url: string; helpText: string; openText: string }) {
    return (
        <>
            <p className="mt-2 text-gray-300">{helpText}</p>
            <div className="flex items-center gap-2 mt-2">
                <Button size="sm" onClick={() => window.open(url)}>
                    {openText}
                </Button>
                <button title="Copy to clipboard" onClick={() => copyToClipboard(url)}>
                    <svg className="icon fill-gray-200 hover:fill-white">
                        <use xlinkHref="#clipboard-icon"></use>
                    </svg>
                </button>
            </div>
        </>
    );
}

function getCsrfToken(): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift()?.replace('%3D', '') || '';
    }

    return '';
}
