import { buildFeedbackVacancyIndex, findFeedbackForVacancy, normalizeFeedbackKey } from './matchFeedbackToVacancy';
import type { Feedback } from '../types/Feedback.types';

const fb = (partial: Partial<Feedback> & Pick<Feedback, 'id' | 'response_status'>): Feedback => ({
    vacancy_id: 0,
    feedback_text: '',
    feedback_date: '2026-11-27T00:00:00.000Z',
    ...partial,
});

describe('matchFeedbackToVacancy', () => {
    it('normalizes nbsp and case', () => {
        expect(normalizeFeedbackKey('  IT-рекрутер\u00a0/ Foo  ')).toBe('it-рекрутер / foo');
    });

    it('matches by vacancy_id first', () => {
        const index = buildFeedbackVacancyIndex([
            fb({ id: 1, vacancy_id: 139205744, response_status: 'Приглашение', title_vacancy: 'X' }),
            fb({ id: 2, vacancy_id: 0, response_status: 'Отказ', title_vacancy: 'X' }),
        ]);
        expect(findFeedbackForVacancy(index, { id: 139205744, title_vacancy: 'X' })?.response_status).toBe(
            'Приглашение',
        );
    });

    it('falls back to title when vacancy_id is 0', () => {
        const index = buildFeedbackVacancyIndex([
            fb({
                id: 5813198353,
                vacancy_id: 0,
                response_status: 'Приглашение',
                title_vacancy: 'Fullstack разработчик в онлайн-проект',
                title_company: 'Playerok',
            }),
        ]);
        expect(
            findFeedbackForVacancy(index, {
                id: 139205744,
                title_vacancy: 'Fullstack разработчик в онлайн-проект',
                title_company: 'Playerok',
            })?.id,
        ).toBe(5813198353);
    });

    it('prefers invite over unreviewed for same title', () => {
        const index = buildFeedbackVacancyIndex([
            fb({ id: 1, response_status: 'Не рассмотрен', title_vacancy: 'DevOps-инженер' }),
            fb({ id: 2, response_status: 'Приглашение', title_vacancy: 'DevOps-инженер' }),
        ]);
        expect(findFeedbackForVacancy(index, { id: 1, title_vacancy: 'DevOps-инженер' })?.id).toBe(2);
    });
});
