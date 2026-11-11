import { WS_ERRORS } from '@config';

/**
 * Map HH job / poll failure strings to user-facing RU copy.
 * Does not treat job failures as «server unavailable».
 */
export function formatHhJobError(raw: unknown): string {
    const message = raw instanceof Error ? raw.message : String(raw ?? '');
    const text = message.trim();

    if (!text) return 'HH job failed';

    if (/CAPTCHA/i.test(text)) {
        const src = text.split(/\s+/).find((part) => /^https?:\/\//i.test(part));
        return src ? `${WS_ERRORS.CAPTCHA_REQUIRED} ${src}` : WS_ERRORS.CAPTCHA_REQUIRED;
    }

    if (/invalid email or password|login ERROR detected/i.test(text)) {
        return WS_ERRORS.INVALID_EMAIL_PASSWORD;
    }

    if (
        /LOGIN button not found|account-login-form not found|credential-type-email|expand-login-by-password|Войти с паролем|email input not found|password input not found|login submit not found|Войти not found|account-type SUBMIT|login did not complete|HH login:/i.test(
            text,
        )
    ) {
        return 'Не удалось войти на HH — проверьте форму входа и попробуйте снова';
    }

    if (/OTP/i.test(text)) {
        return 'HH требует код подтверждения — войдите вручную на hh.ru и повторите позже';
    }

    if (/hh closed|site closed/i.test(text)) {
        return WS_ERRORS.SITE_CLOSED;
    }

    if (/timed out waiting for worker/i.test(text)) {
        return 'HH задача превысила время ожидания — попробуйте ещё раз';
    }

    return text;
}
