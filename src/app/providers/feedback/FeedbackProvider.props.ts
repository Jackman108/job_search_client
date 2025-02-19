import {Feedback} from "@features/feedback/types/Feedback.types";

export interface FeedbackContextType {
    feedbacks: Feedback[];
    loading: boolean;
    error: string | null;
    fetchFeedbacks: () => Promise<void>;
    deleteFeedback: (id: number) => Promise<void>;
}