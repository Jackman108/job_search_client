import axios from 'axios';
import { AUTH_URL } from '@config';
import { extractAccessToken } from '@shared/utils/tokenRefresh.utils';

let inflight: Promise<string | null> | null = null;

/**
 * GET AUTH_URL/auth/refresh-tokens (httpOnly refresh cookie) → new access JWT, or null on failure.
 * Single-flight: concurrent callers (AuthProvider + data API) share one request so refresh-token
 * rotation is not raced. Uses bare axios (no interceptors) so it can never recurse into itself.
 */
export const refreshAccessToken = (): Promise<string | null> => {
    if (!inflight) {
        inflight = axios
            .get(`${AUTH_URL}/auth/refresh-tokens`, { withCredentials: true })
            .then((response) => {
                const accessToken = extractAccessToken(response.data);
                if (!accessToken) console.warn('refreshAccessToken: response has no accessToken');
                return accessToken;
            })
            .catch((error) => {
                console.warn('refreshAccessToken failed', error?.response?.status ?? error?.message ?? error);
                return null;
            })
            .finally(() => {
                inflight = null;
            });
    }
    return inflight;
};
