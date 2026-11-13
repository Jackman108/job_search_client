import { useEffect, useRef } from 'react';
import { refreshAccessToken } from '@shared/api/refreshAccessToken';
import { getAccessTokenStatus } from '@shared/utils/tokenRefresh.utils';

/**
 * When the stored access JWT is expired, try ONE refresh (httpOnly cookie) instead of
 * blindly clearing it; clear only when refresh fails or yields another unusable token.
 * `attempted` remembers the token we already tried so re-renders / StrictMode cannot loop.
 */
const useExpiredTokenRefresh = (token: string | null, setToken: (token: string | null) => void): void => {
    const attempted = useRef<string | null>(null);
    const setTokenRef = useRef(setToken);
    const tokenRef = useRef(token);
    setTokenRef.current = setToken;
    tokenRef.current = token;

    useEffect(() => {
        if (!token) {
            attempted.current = null;
            return;
        }
        const status = getAccessTokenStatus(token);
        if (status === 'valid') return;
        if (status === 'invalid') {
            setTokenRef.current(null);
            return;
        }
        if (attempted.current === token) return;
        attempted.current = token;

        void refreshAccessToken().then((fresh) => {
            // User may have logged out / logged in again while refresh was in flight.
            if (tokenRef.current !== token) return;
            setTokenRef.current(fresh && getAccessTokenStatus(fresh) === 'valid' ? fresh : null);
        });
    }, [token]);
};

export default useExpiredTokenRefresh;
