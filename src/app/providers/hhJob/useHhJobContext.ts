import { createContext, useContext } from 'react';
import type { HhJobState } from './HhJobProvider.props';

const HhJobContext = createContext<HhJobState | undefined>(undefined);

export const useHhJobContext = () => {
    const context = useContext(HhJobContext);
    if (!context) {
        throw new Error('useHhJobContext must be used within a HhJobProvider');
    }
    return context;
};

export default HhJobContext;
