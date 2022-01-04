import React, { useState } from 'react';
import { IgnitionConfigContext, IgnitionIcon } from '@flareapp/ignition-ui';
import { useContext } from 'react';
import {IgniteDataContext} from "contexts/IgniteDataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faAdjust, faAngleDown } from '@fortawesome/free-solid-svg-icons';

type Props = {
    isOpen: boolean;
};

export default function SettingsDropdown({ isOpen }: Props) {
    const igniteData = useContext(IgniteDataContext);
    const {ignitionConfig, setIgnitionConfig} = useContext(IgnitionConfigContext);
    const [editor, setEditor] = useState(ignitionConfig.editor);
    const [previousTheme, setPreviousTheme] = useState<string|null>(null);
    const [isUpdatingConfig, setIsUpdatingConfig] = useState(false);
    const [updateWasSuccessful, setUpdateWasSuccessful] = useState(false);
    const [themeOptions, setThemeOptions] = useState([
        {
            value: 'light',
            icon: <FontAwesomeIcon icon={faSun} className="group-hover:text-amber-400"/>,
            selected: ignitionConfig.theme === 'light',
        },
        {
            value: 'dark',
            icon: <FontAwesomeIcon icon={faMoon} className="group-hover:text-amber-300"/>,
            selected: ignitionConfig.theme === 'dark',
        },
        {
            value: 'auto',
            icon: <FontAwesomeIcon icon={faAdjust} className="group-hover:text-indigo-500"/>,
            selected: ignitionConfig.theme === 'auto',
        }
    ]);

    function handleEditorChange(editor: string) {
        setEditor(editor);
        setIgnitionConfig({...ignitionConfig, editor});
    }

    function handleThemeChange() {
        const currentThemeIndex = themeOptions.findIndex((option) => option.selected);

        const newIndex = currentThemeIndex === -1 || currentThemeIndex === themeOptions.length - 1
            ? 0
            : currentThemeIndex + 1;

        setPreviousTheme(themeOptions[currentThemeIndex].value);

        setThemeOptions([...themeOptions.map((option, index) => {
            option.selected = index === newIndex;

            return option;
        })]);

        setIgnitionConfig({...ignitionConfig, theme: themeOptions[newIndex].value as 'light' | 'dark' | 'auto'});
    }

    async function updateConfig() {
        if (isUpdatingConfig) {
            return;
        }

        try {
            setUpdateWasSuccessful(false);
            setIsUpdatingConfig(true);

            if (!igniteData.updateConfigEndpoint) {
                return;
            }

            const response = await fetch(igniteData.updateConfigEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    editor,
                    theme: themeOptions.find((option) => option.selected)?.value,
                    hide_solutions: false, // TODO
                }),
            });

            setUpdateWasSuccessful(response.status >= 200 && response.status < 300);

            setTimeout(() => {
                setUpdateWasSuccessful(false);
            }, 3000);
        } catch (error) {
            console.error(error);
            setUpdateWasSuccessful(false);
        } finally {
            setIsUpdatingConfig(false);
        }
    }

    return (
        <div
            className={`
                absolute mt-2 top-10 right-1/2 translate-x-6 transition-all duration-150 origin-top-right
                ${isOpen ? '' : 'opacity-0 pointer-events-none scale-90'}
            `}
        >
            <div className="flex px-4 justify-end">
                <div className="w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown"/>
            </div>
            <div className="~bg-dropdown px-10 py-8 shadow-2xl">
                <div className="flex items-center justify-between gap-6">
                    <h4 className="whitespace-nowrap font-semibold">Ignition Settings</h4>
                    <a className="text-xs ~text-gray-500 hover:text-red-500 flex items-center underline transition-colors" href="https://flareapp.io/ignition">
                        Docs
                        <IgnitionIcon />
                    </a>
                </div>
                <h4 className="mt-6 uppercase tracking-wider ~text-gray-500 text-xs font-bold">Editor</h4>
                <div className="group mt-2 relative">
                    <select
                        className="block appearance-none w-full ~bg-gray-500/5 h-12 px-4 pr-8 rounded-none leading-tight"
                        value={editor}
                        onChange={event => handleEditorChange(event.target.value)}
                    >
                        {Object.entries(ignitionConfig.editorOptions).map(([editor, {label}], ) => (
                            <option key={editor} value={editor}>{label}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                        <FontAwesomeIcon icon={faAngleDown} className="group-hover:text-indigo-500 text-sm"/>
                    </div>
                </div>
                <h4 className="mt-6 uppercase tracking-wider ~text-gray-500 text-xs font-bold">Theme</h4>
                <button
                    className="mt-2 w-full ~bg-gray-500/5 rounded-none leading-tight"
                    onClick={handleThemeChange}
                >
                    <div
                        className="group flex items-center"
                        style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}
                    >
                        <div className="px-4">
                            {themeOptions.map(({icon, value, selected}) => (
                                <div
                                    key={value}
                                    className={`
                                        h-12 flex items-center origin-bottom
                                        ${selected ? 'transition-transform duration-1000' : ''}
                                        ${value === previousTheme ? 'transition-transform duration-1000 absolute top-0 left-4 rotate-180' : ''}
                                        ${(!selected && value !== previousTheme) ? 'absolute top-0 left-4 -rotate-180' : ''}
                                    `}
                                >
                                    <span className={`text-sm ~text-gray-500 transition-colors duration-500`} >
                                        {icon}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div id="theme-name" className="-ml-1 first-letter:uppercase">
                            {themeOptions.find(t => t.selected)?.value}
                        </div>
                    </div>
                </button>
                <div className="mt-6 flex items-center gap-4">
                <button
                    onClick={updateConfig}
                    disabled={isUpdatingConfig}
                    className={`px-4 h-8 bg-red-500 text-white whitespace-nowrap border-b
                        border-red-500/25 text-xs uppercase tracking-wider font-bold rounded-sm
                        shadow-md
                        transform
                        transition-animation
                        hover:shadow-lg
                        active:shadow-inner
                        active:translate-y-px
                        ${isUpdatingConfig ? 'opacity-50' : 'opacity-100'}
                    `}
                >
                    Save settings
                </button>
                {updateWasSuccessful && <p className="text-emerald-500 text-sm">Saved!</p>}
                </div>
            </div>
        </div>
    );
}
