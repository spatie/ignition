import { createContext } from 'react';
import noop from 'lodash/noop';
import { IgnitionConfig } from '../../types';

export default createContext<{
    ignitionConfig: IgnitionConfig;
    setIgnitionConfig: React.Dispatch<React.SetStateAction<IgnitionConfig>>;
    theme: IgnitionConfig['theme'];
}>({
    /* @ts-ignore */
    ignitionConfig: {},
    setIgnitionConfig: noop,
});
