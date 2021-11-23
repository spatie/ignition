import { createContext } from 'react';
import { IgniteData } from './types';

export const igniteDataContext = createContext<IgniteData>({} as any);
