import React, { useState, useContext } from 'react';
import { Button, IgnitionConfigContext, IgnitionIcon, InlineCodeSnippet } from '@flareapp/ignition-ui';
import { IgniteDataContext } from 'contexts/IgniteDataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faAdjust, faAngleDown } from '@fortawesome/free-solid-svg-icons';

type Props = {
    isOpen: boolean;
};

export default function SettingsDropdown({ isOpen }: Props) {
    const igniteData = useContext(IgniteDataContext);
    const { ignitionConfig, setIgnitionConfig } = useContext(IgnitionConfigContext);
    const [editor, setEditor] = useState(ignitionConfig.editor || '');
    const [previousTheme, setPreviousTheme] = useState<string | null>(null);
    const [isUpdatingConfig, setIsUpdatingConfig] = useState(false);
    const [updateWasSuccessful, setUpdateWasSuccessful] = useState(false);
    const [themeOptions, setThemeOptions] = useState([
        {
            value: 'light',
            icon: <FontAwesomeIcon icon={faSun} className="group-hover:text-amber-400" />,
            selected: ignitionConfig.theme === 'light',
        },
        {
            value: 'dark',
            icon: <FontAwesomeIcon icon={faMoon} className="group-hover:text-amber-300" />,
            selected: ignitionConfig.theme === 'dark',
        },
        {
            value: 'auto',
            icon: <FontAwesomeIcon icon={faAdjust} className="group-hover:text-indigo-500" />,
            selected: ignitionConfig.theme === 'auto',
        },
    ]);

    function handleEditorChange(editor: string) {
        setEditor(editor);
        setIgnitionConfig({ ...ignitionConfig, editor });
    }

    function handleThemeChange() {
        const currentThemeIndex = themeOptions.findIndex((option) => option.selected);

        const newIndex =
            currentThemeIndex === -1 || currentThemeIndex === themeOptions.length - 1 ? 0 : currentThemeIndex + 1;

        setPreviousTheme(themeOptions[currentThemeIndex].value);

        setThemeOptions([
            ...themeOptions.map((option, index) => {
                option.selected = index === newIndex;

                return option;
            }),
        ]);

        setIgnitionConfig({ ...ignitionConfig, theme: themeOptions[newIndex].value as 'light' | 'dark' | 'auto' });
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
                <div className="w-0 h-0 border-[10px] border-t-0 border-transparent ~border-b-dropdown" />
            </div>
            <div className="flex flex-col gap-6 ~bg-dropdown px-10 py-8 shadow-2xl">
                <div className="flex items-center justify-between gap-6">
                    <h4 className="whitespace-nowrap font-semibold">Ignition Settings</h4>
                    <a
                        className="text-xs ~text-gray-500 hover:text-red-500 flex items-center underline transition-colors"
                        href="https://flareapp.io/ignition?utm_campaign=ignition&utm_source=ignition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Docs
                        <IgnitionIcon />
                    </a>
                </div>

                <label htmlFor="editor-select">
                    <span className="uppercase tracking-wider ~text-gray-500 text-xs font-bold">Editor</span>
                    <div className="group mt-2">
                        <select
                            id="editor-select"
                            className="block appearance-none w-full ~bg-gray-500/5 h-12 px-4 pr-8 rounded-none leading-tight"
                            value={editor}
                            onChange={(event) => handleEditorChange(event.target.value)}
                        >
                            {Object.entries(ignitionConfig?.editorOptions || []).map(([editor, { label }]) => (
                                <option className="text-gray-800" key={editor} value={editor}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                            <FontAwesomeIcon icon={faAngleDown} className="group-hover:text-indigo-500 text-sm" />
                        </div>
                    </div>
                </label>

                <div>
                    <span className="uppercase tracking-wider ~text-gray-500 text-xs font-bold">Theme</span>
                    <button
                        className="mt-2 w-full ~bg-gray-500/5 rounded-none leading-tight"
                        onClick={handleThemeChange}
                    >
                        <div
                            className="group flex items-center"
                            style={{
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                            }}
                        >
                            <div className="px-4">
                                {themeOptions.map(({ icon, value, selected }) => (
                                    <div
                                        key={value}
                                        className={`
                                        h-12 flex items-center origin-bottom
                                        ${selected ? 'transition-transform duration-1000' : ''}
                                        ${
                                            value === previousTheme
                                                ? 'transition-transform duration-1000 absolute top-0 left-4 rotate-180'
                                                : ''
                                        }
                                        ${
                                            !selected && value !== previousTheme
                                                ? 'absolute top-0 left-4 -rotate-180'
                                                : ''
                                        }
                                    `}
                                    >
                                        <span className={`text-sm ~text-gray-500 transition-colors duration-500`}>
                                            {icon}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div id="theme-name" className="-ml-1 first-letter:uppercase">
                                {themeOptions.find((t) => t.selected)?.value}
                            </div>
                        </div>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={updateConfig}
                        disabled={isUpdatingConfig}
                        className={"bg-red-500 border-red-500/25 text-white"}
                    >
                        Save settings
                    </Button>

                    {updateWasSuccessful && <p className="text-emerald-500 text-sm">Saved!</p>}
                </div>
                <p className="text-xs">
                    Settings will be saved locally in <InlineCodeSnippet>~/.ignition.json</InlineCodeSnippet>.
                </p>
            </div>
        </div>
    );
}
