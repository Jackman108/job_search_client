import { validateEmail, validatePassword, validateSearchUrl } from './validateUtils';

describe('validateUtils', () => {
    it('validates email shape', () => {
        expect(validateEmail('user@example.com').isValidEmail).toBe(true);
        expect(validateEmail('bad').isValidEmail).toBe(false);
    });

    it('requires hh.ru search URLs when provided', () => {
        expect(validateSearchUrl('https://hh.ru/search/vacancy').isValidSearchUrl).toBe(true);
        expect(validateSearchUrl('https://evil.test/').isValidSearchUrl).toBe(false);
        expect(validateSearchUrl('').isValidSearchUrl).toBe(true);
    });

    it('enforces password rules', () => {
        expect(validatePassword('Aa1234').isValidPassword).toBe(true);
        expect(validatePassword('short').isValidPassword).toBe(false);
        expect(validatePassword('noupper1').isValidPassword).toBe(false);
        expect(validatePassword('NoNumber').isValidPassword).toBe(false);
    });
});
