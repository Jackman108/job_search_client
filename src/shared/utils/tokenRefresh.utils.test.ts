import { extractAccessToken, getAccessTokenStatus, shouldRefreshAfterUnauthorized } from './tokenRefresh.utils';

const makeJwt = (exp: number): string => {
    const b64 = (obj: object) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    return `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ id: '1', email: 'a@b.c', roles: [], iat: 1, exp })}.sig`;
};
const nowSec = () => Math.floor(Date.now() / 1000);

describe('getAccessTokenStatus', () => {
    it('is valid for a future exp, with or without Bearer prefix', () => {
        const jwt = makeJwt(nowSec() + 300);
        expect(getAccessTokenStatus(jwt)).toBe('valid');
        expect(getAccessTokenStatus(`Bearer ${jwt}`)).toBe('valid');
    });

    it('is expired for a past exp', () => {
        expect(getAccessTokenStatus(makeJwt(nowSec() - 10))).toBe('expired');
    });

    it('is invalid for empty / garbage tokens', () => {
        expect(getAccessTokenStatus(null)).toBe('invalid');
        expect(getAccessTokenStatus('')).toBe('invalid');
        expect(getAccessTokenStatus('not-a-jwt')).toBe('invalid');
    });
});

describe('shouldRefreshAfterUnauthorized', () => {
    it('refreshes on the first 401 only', () => {
        expect(shouldRefreshAfterUnauthorized(401, false)).toBe(true);
        expect(shouldRefreshAfterUnauthorized(401, true)).toBe(false);
    });

    it('ignores other statuses', () => {
        expect(shouldRefreshAfterUnauthorized(403, false)).toBe(false);
        expect(shouldRefreshAfterUnauthorized(500, false)).toBe(false);
        expect(shouldRefreshAfterUnauthorized(undefined, false)).toBe(false);
    });
});

describe('extractAccessToken', () => {
    it('returns the accessToken string', () => {
        expect(extractAccessToken({ accessToken: 'abc' })).toBe('abc');
    });

    it('returns null for missing / malformed payloads', () => {
        expect(extractAccessToken(undefined)).toBeNull();
        expect(extractAccessToken('x')).toBeNull();
        expect(extractAccessToken({})).toBeNull();
        expect(extractAccessToken({ accessToken: 5 })).toBeNull();
        expect(extractAccessToken({ accessToken: '  ' })).toBeNull();
    });
});
