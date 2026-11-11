import { shouldRetryAuthenticatedQuery } from './authQueryOptions.utils';

describe('shouldRetryAuthenticatedQuery', () => {
    it('does not retry 401/403', () => {
        expect(shouldRetryAuthenticatedQuery(0, { response: { status: 401 } })).toBe(false);
        expect(shouldRetryAuthenticatedQuery(0, { response: { status: 403 } })).toBe(false);
    });

    it('retries other errors up to 2 failures', () => {
        expect(shouldRetryAuthenticatedQuery(0, new Error('net'))).toBe(true);
        expect(shouldRetryAuthenticatedQuery(1, { response: { status: 500 } })).toBe(true);
        expect(shouldRetryAuthenticatedQuery(2, new Error('net'))).toBe(false);
    });
});
