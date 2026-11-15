import { resolveHhJobStage } from './hhJobStage.utils';

describe('resolveHhJobStage', () => {
    it('marks captcha when awaiting', () => {
        expect(resolveHhJobStage({ awaitingCaptcha: true }).id).toBe('captcha');
    });

    it('maps found event to serp', () => {
        expect(resolveHhJobStage({ status: 'running', lastEvent: 'Найдено 4 вакансий' }).id).toBe('serp');
    });

    it('maps login-ish events', () => {
        expect(resolveHhJobStage({ status: 'running', lastEvent: 'Magritte ready' }).id).toBe('login');
    });
});
