import { useMemo } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { ADMIN_ROLE, canAccess, getRolesFromToken, isAuthenticatedToken, tokenHasRole, type AccessLevel } from '@utils';

export const useAuthSession = () => {
    const { token } = useAuth();

    return useMemo(() => {
        const isAuthenticated = isAuthenticatedToken(token);
        const roles = getRolesFromToken(token);
        const isAdmin = tokenHasRole(token, ADMIN_ROLE);

        return {
            token,
            isAuthenticated,
            roles,
            isAdmin,
            canAccess: (level: AccessLevel) => canAccess(level, token),
            hasRole: (role: string) => tokenHasRole(token, role),
        };
    }, [token]);
};
