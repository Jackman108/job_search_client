import { formatHhJobError } from './formatHhJobError';
import { WS_ERRORS } from '@config';

describe('formatHhJobError', () => {
    it('maps captcha with optional src', () => {
        expect(formatHhJobError('CAPTCHA detected restart https://img.example/c.png')).toContain(
            WS_ERRORS.CAPTCHA_REQUIRED,
        );
        expect(formatHhJobError('CAPTCHA detected restart https://img.example/c.png')).toContain(
            'https://img.example/c.png',
        );
    });

    it('maps login credential failures', () => {
        expect(formatHhJobError('HH login failed: invalid email or password')).toBe(WS_ERRORS.INVALID_EMAIL_PASSWORD);
    });

    it('maps Magritte gate failures to login retry copy', () => {
        expect(formatHhJobError(new Error('HH login: password input not found (x)'))).toMatch(/Не удалось войти/);
        expect(formatHhJobError('HH login: Войти с паролем / expand-login-by-password not found')).toMatch(
            /Не удалось войти/,
        );
    });

    it('keeps unknown job detail (not server-down)', () => {
        expect(formatHhJobError('cover letter boom')).toBe('cover letter boom');
    });
});
