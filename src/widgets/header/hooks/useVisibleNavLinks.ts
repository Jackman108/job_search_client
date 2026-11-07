import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthSession } from '@features/auth';
import { navConfig } from '@shared/config/navConfig';

export interface VisibleNavLink {
    path: string;
    label: string;
}

export const useVisibleNavLinks = (): VisibleNavLink[] => {
    const { canAccess } = useAuthSession();
    const { t } = useTranslation('header');

    return useMemo(
        () =>
            navConfig
                .filter((item) => canAccess(item.access))
                .map((item) => ({
                    path: item.path,
                    label: t(item.labelKey),
                })),
        [canAccess, t],
    );
};
