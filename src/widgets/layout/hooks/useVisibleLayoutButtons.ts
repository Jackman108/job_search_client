import { useMemo } from 'react';
import { useAuthSession } from '@features/auth';
import { layoutConfig } from '../config/layoutConfig';

export const useVisibleLayoutButtons = () => {
    const { isAuthenticated } = useAuthSession();

    return useMemo(
        () => layoutConfig.filter((button) => !(button.requiresAuth && !isAuthenticated)),
        [isAuthenticated],
    );
};
