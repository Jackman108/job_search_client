import { decodeToken, isTokenExpired } from './tokenUtils';

export type AccessTokenStatus = 'valid' | 'expired' | 'invalid';

/** Classify a stored access JWT without touching the network. */
export function getAccessTokenStatus(token: string | null | undefined): AccessTokenStatus {
    if (!token) return 'invalid';
    try {
        return isTokenExpired(decodeToken(token).exp) ? 'expired' : 'valid';
    } catch {
        return 'invalid';
    }
}

/**
 * Retry a data API call after refresh only for a first 401.
 * `alreadyRetried` prevents refresh loops (second 401 is surfaced as-is).
 */
export function shouldRefreshAfterUnauthorized(status: number | undefined, alreadyRetried: boolean): boolean {
    return status === 401 && !alreadyRetried;
}

/** Pull `accessToken` out of the auth refresh response body; null if missing / not a string. */
export function extractAccessToken(data: unknown): string | null {
    if (!data || typeof data !== 'object') return null;
    const value = (data as { accessToken?: unknown }).accessToken;
    return typeof value === 'string' && value.trim() ? value : null;
}
