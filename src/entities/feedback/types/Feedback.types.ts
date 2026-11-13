export interface Feedback {
    id: number;
    vacancy_id: number;
    feedback_text: string;
    response_status: string;
    feedback_date: string;
    feedback_date_time?: string;
    feedback_date_date?: string;
    /** Joined from vacancy table when available. */
    title_vacancy?: string;
    title_company?: string;
}
