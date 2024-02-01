import React, { useContext, useState } from 'react';
import { Button, FlareIcon } from '@flareapp/ignition-ui';
import Checkbox from 'components/ui/Checkbox';
import { IgniteDataContext } from '../contexts/IgniteDataContext';
import CopyableUrl from './ui/CopyableUrl';
import shareClient, { SectionName } from '../shareClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
    isOpen: boolean;
};

export default function ShareDropdown({ isOpen }: Props) {
    const igniteData = useContext(IgniteDataContext);
    const [publicUrl, setPublicUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedSections, setSelectedSections] = useState<
        Array<{ name: SectionName; label: string; selected: boolean }>
    >([
        { name: 'stackTrace', label: 'Stack', selected: true },
        { name: 'context', label: 'Context', selected: true },
        { name: 'debug', label: 'Debug', selected: true },
    ]);

    function toggleSelected(sectionName: SectionName) {
        const section = selectedSections.find((section) => section.name === sectionName);

        if (section) {
            setSelectedSections(
                selectedSections.map((section) =>
                    section.name === sectionName ? { ...section, selected: !section.selected } : section,
                ),
            );
        }
    }

    async function onShareError() {
        if (!igniteData.config.shareEndpoint) {
            return;
        }

        setError(null);
        setIsLoading(true);

        const selectedSectionNames = selectedSections
            .filter((selectedSection) => selectedSection.selected)
            .map((selectedSection) => selectedSection.name);

        try {
            const response = await shareClient(igniteData, selectedSectionNames);

            window.open(response.owner_url, '_blank', 'noopener,noreferrer');

            setPublicUrl(response.public_url);
        } catch (e) {
            console.error(e);
            setError('Something went wrong while sharing, please try again.');
        }

        setIsLoading(false);
    }

    return (
        <div
            className={`block absolute mt-2 top-10 right-1/2 transform translate-x-8 transition-all duration-150 origin-top-right
                 ${isOpen ? '' : 'opacity-0 pointer-events-none scale-90'}`}
        >
            <div className="flex px-4 justify-end">
                <div className="w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown" />
            </div>
            <div className="flex flex-col gap-6 ~bg-dropdown px-10 py-8 shadow-2xl">
                <div className="flex items-center justify-between gap-6">
                    <h4 className="whitespace-nowrap font-semibold">Share with Flare</h4>
                    <a
                        className="text-xs ~text-gray-500 hover:text-violet-500 flex items-center underline transition-colors"
                        href="https://flareapp.io/docs/ignition/introducing-ignition/sharing-errors?utm_campaign=ignition&utm_source=ignition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Docs
                        <FlareIcon />
                    </a>
                </div>
                {!publicUrl && (
                    <>
                        <ul className="grid justify-start gap-3">
                            {selectedSections.map(({ selected, name, label }) => (
                                <li key={name}>
                                    <Checkbox onChange={() => toggleSelected(name)} checked={selected} label={label} />
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4">
                            <Button
                                disabled={isLoading || !selectedSections.some((section) => section.selected)}
                                className={'bg-violet-500 border-violet-500/25 CopyButton text-white'}
                                onClick={onShareError}
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="opacity-50 text-xs mr-1" />
                                Create Share
                            </Button>
                        </div>
                    </>
                )}

                {publicUrl && (
                    <div className="grid grid-cols-1 gap-4">
                        <CopyableUrl
                            url={publicUrl}
                            helpText="Share your error with others"
                            openText="Visit public share"
                        />
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
}
