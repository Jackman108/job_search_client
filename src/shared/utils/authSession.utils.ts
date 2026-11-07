import { decodeToken, isTokenExpired } from './tokenUtils';

export const ADMIN_ROLE = 'ADMIN';

export type AccessLevel = 'public' | 'auth' | 'admin';

export function getRolesFromToken(token: string | null): string[] {
    if (!token) return [];
    try {
        return decodeToken(token).roles ?? [];
    } catch {
        return [];
    }
}

export function isAuthenticatedToken(token: string | null): boolean {
    if (!token) return false;
    try {
        const { exp } = decodeToken(token);
        return !isTokenExpired(exp);
    } catch {
        return false;
    }
}

export function tokenHasRole(token: string | null, role: string): boolean {
    return getRolesFromToken(token).includes(role);
}

export function canAccess(level: AccessLevel, token: string | null): boolean {
    if (level === 'public') return true;
    if (!isAuthenticatedToken(token)) return false;
    if (level === 'admin') return tokenHasRole(token, ADMIN_ROLE);
    return true;
}
