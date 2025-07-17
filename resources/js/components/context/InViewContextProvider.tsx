import React, { useState } from 'react';
import InViewContext from './InViewContext';

type Props = { children: React.ReactNode };

export default function InViewContextProvider({ children }: Props) {
    const [inView, setInView] = useState<Array<string>>([]);

    return <InViewContext.Provider value={{ inView, setInView }}>{children}</InViewContext.Provider>;
}
