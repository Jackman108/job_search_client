/** Read HTTP status from Axios-like or fetch-like errors without importing axios (Jest ESM). */
const getErrorStatus = (error: unknown): number | undefined => {
    if (!error || typeof error !== 'object') return undefined;
    const response = (error as { response?: { status?: number } }).response;
    return response?.status;
};

/** Skip retries for expected auth failures (avoids focus/refetch spam). */
export const shouldRetryAuthenticatedQuery = (failureCount: number, error: unknown): boolean => {
    const status = getErrorStatus(error);
    if (status === 401 || status === 403) {
        return false;
    }
    return failureCount < 2;
};
