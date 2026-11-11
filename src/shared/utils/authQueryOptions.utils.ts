import axios from 'axios';

/** Skip retries for expected auth failures (avoids focus/refetch spam). */
export const shouldRetryAuthenticatedQuery = (failureCount: number, error: unknown): boolean => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            return false;
        }
    }
    return failureCount < 2;
};
