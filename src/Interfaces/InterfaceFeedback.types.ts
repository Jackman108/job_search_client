export interface Feedback {
    id: number;
    vacancy_id: number;
    feedback_text: string;
    response_status: string;
    feedback_date: string;
    feedback_date_time?: string;
    feedback_date_date?: string;
}

export interface FeedbackContextType {
    feedbacks: Feedback[];
    loading: boolean;
    error: string | null;
    fetchFeedbacks: () => Promise<void>;
    deleteFeedback: (id: number) => Promise<void>;
}


