import { feedbackStatusRank } from './feedbackStatusRank';
import type { Feedback } from '../types/Feedback.types';

/** Normalize title/company for vacancy↔feedback join when vacancy_id is missing. */
export function normalizeFeedbackKey(value: string | undefined | null): string {
    return (value || '')
        .toLowerCase()
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function preferFeedback(a: Feedback | undefined, b: Feedback): Feedback {
    if (!a) return b;
    const byStatus = feedbackStatusRank(a.response_status) - feedbackStatusRank(b.response_status);
    if (byStatus !== 0) return byStatus < 0 ? a : b;
    const aTime = Date.parse(a.feedback_date || '') || 0;
    const bTime = Date.parse(b.feedback_date || '') || 0;
    return bTime >= aTime ? b : a;
}

/**
 * Index feedbacks by vacancy_id and by title (+ optional company) so Home table
 * still shows status when list-sync left vacancy_id=0.
 */
export function buildFeedbackVacancyIndex(feedbacks: Feedback[]): {
    byId: Map<number, Feedback>;
    byTitle: Map<string, Feedback>;
} {
    const byId = new Map<number, Feedback>();
    const byTitle = new Map<string, Feedback>();

    for (const row of feedbacks) {
        const id = Number(row.vacancy_id);
        if (Number.isFinite(id) && id > 0) {
            byId.set(id, preferFeedback(byId.get(id), row));
        }

        const title = normalizeFeedbackKey(row.title_vacancy);
        if (!title) continue;
        byTitle.set(title, preferFeedback(byTitle.get(title), row));

        const company = normalizeFeedbackKey(row.title_company);
        if (company) {
            byTitle.set(`${title}::${company}`, preferFeedback(byTitle.get(`${title}::${company}`), row));
        }
    }

    return { byId, byTitle };
}

export function findFeedbackForVacancy(
    index: ReturnType<typeof buildFeedbackVacancyIndex>,
    vacancy: { id: number; title_vacancy?: string; title_company?: string },
): Feedback | undefined {
    const id = Number(vacancy.id);
    if (Number.isFinite(id) && id > 0) {
        const hit = index.byId.get(id);
        if (hit) return hit;
    }

    const title = normalizeFeedbackKey(vacancy.title_vacancy);
    if (!title) return undefined;

    const company = normalizeFeedbackKey(vacancy.title_company);
    if (company) {
        const withCompany = index.byTitle.get(`${title}::${company}`);
        if (withCompany) return withCompany;
    }
    return index.byTitle.get(title);
}
