import {ConfigItem} from "@type";

export const feedbackConfig: Record<string, ConfigItem> = {
    feedback: {
        title: 'Feedbacks',
        apiEndpoint: '/feedback',
        fields: {
            id: 'ID',
            vacancy_id: 'Vacancy ID',
            feedback_text: 'Feedback Text',
            feedback_date: 'Feedback Date',
            response_status: 'Response Status',
        },
    },
};