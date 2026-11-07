import { formatDate } from '@utils';
import { Feedback } from '../types/Feedback.types';

export const formatFeedbackDate = (feedback: Feedback): Feedback => {
    const formattedDate = formatDate(feedback.feedback_date);
    return {
        ...feedback,
        feedback_date_time: formattedDate.time,
        feedback_date_date: formattedDate.date,
    };
};
