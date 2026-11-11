import { shouldRedirectToServerUnavailable } from './serverUnavailableRedirect';

describe('shouldRedirectToServerUnavailable', () => {
    it('redirects on network error and 5xx', () => {
        expect(shouldRedirectToServerUnavailable({ code: 'ERR_NETWORK', message: 'Network Error' })).toBe(true);
        expect(shouldRedirectToServerUnavailable({ response: { status: 503 } })).toBe(true);
    });

    it('does not redirect on 4xx, cancel, or plain job Error', () => {
        expect(shouldRedirectToServerUnavailable({ response: { status: 400 } })).toBe(false);
        expect(shouldRedirectToServerUnavailable({ code: 'ERR_CANCELED' })).toBe(false);
        expect(shouldRedirectToServerUnavailable({ message: 'HH login failed: invalid email or password' })).toBe(
            false,
        );
    });
});
