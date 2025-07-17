import React, { useEffect, useState } from 'react';
import IgnitionConfigContext from './IgnitionConfigContext';
import { IgnitionConfig } from '../../types';
import usePrefersColorScheme from 'use-prefers-color-scheme';

type Props = {
    children: React.ReactNode;
    ignitionConfig: IgnitionConfig;
};

export default function IgnitionConfigContextProvider({ children, ignitionConfig: initialIgnitionConfig }: Props) {
    const [ignitionConfig, setIgnitionConfig] = useState<IgnitionConfig>(initialIgnitionConfig);
    const scheme = usePrefersColorScheme();

    const theme =
        ignitionConfig.theme === 'auto' ? (scheme !== 'no-preference' ? scheme : 'light') : ignitionConfig.theme;

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark', 'auto');
        document.documentElement.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        setIgnitionConfig(initialIgnitionConfig);
    }, [initialIgnitionConfig]);

    return (
        <IgnitionConfigContext.Provider value={{ ignitionConfig, setIgnitionConfig, theme }}>
            {children}
        </IgnitionConfigContext.Provider>
    );
}
