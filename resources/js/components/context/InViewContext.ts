import { createContext } from 'react';
import noop from 'lodash/noop';

export default createContext<{
    inView: Array<string>;
    setInView: React.Dispatch<React.SetStateAction<Array<string>>>;
}>({
    inView: [],
    setInView: noop,
});
