import HhJobContext from './useHhJobContext';
import { AppProvidersProps } from '@app/types/AppProviders.props';
import useHhJobRunner from '@shared/hooks/hhJob/useHhJobRunner';

const HhJobProvider = ({ children }: AppProvidersProps) => {
    const runner = useHhJobRunner();

    return <HhJobContext.Provider value={runner}>{children}</HhJobContext.Provider>;
};

export default HhJobProvider;
