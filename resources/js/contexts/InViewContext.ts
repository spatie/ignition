import { createContext } from 'react';
import { noop } from 'lodash';

export default createContext<{
    inView: Array<string>;
    setInView: React.Dispatch<React.SetStateAction<Array<string>>>;
}>({
    inView: [],
    setInView: noop,
});
