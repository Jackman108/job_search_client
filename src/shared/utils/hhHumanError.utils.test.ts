import { humanizeHhError } from './hhHumanError.utils';

describe('humanizeHhError', () => {
    it('explains cancel', () => {
        expect(humanizeHhError('Cancelled by user via /stop')).toMatch(/остановлен/i);
    });

    it('keeps unknown with prefix', () => {
        expect(humanizeHhError('weird boom')).toMatch(/weird boom/);
    });
});
