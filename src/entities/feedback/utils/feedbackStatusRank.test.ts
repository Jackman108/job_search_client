import { compareFeedbackByStatusThenDate, feedbackStatusRank } from './feedbackStatusRank';

describe('feedbackStatusRank', () => {
    it('ranks invites above rejects and unread', () => {
        expect(feedbackStatusRank('Приглашение')).toBeLessThan(feedbackStatusRank('Отказ'));
        expect(feedbackStatusRank('Отказ')).toBeLessThan(feedbackStatusRank('Не рассмотрен'));
    });
});

describe('compareFeedbackByStatusThenDate', () => {
    it('puts invites first then newer dates', () => {
        const rows = [
            { response_status: 'Не рассмотрен', feedback_date: '2026-11-16T12:00:00.000Z' },
            { response_status: 'Приглашение', feedback_date: '2026-11-10T12:00:00.000Z' },
            { response_status: 'Отказ', feedback_date: '2026-11-15T12:00:00.000Z' },
        ];
        const sorted = [...rows].sort(compareFeedbackByStatusThenDate);
        expect(sorted.map((r) => r.response_status)).toEqual(['Приглашение', 'Отказ', 'Не рассмотрен']);
    });
});
