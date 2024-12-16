// src/hooks/useFetchFeedback.ts
import {useCallback, useEffect, useState} from 'react';
import {Feedback} from '../../Interfaces/InterfaceFeedback.types';
import useApi from '../../api/api';
import {formatAndSortData, formatDate} from '../../utils/formatUtils';

const useFetchFeedback = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const {loading, error, request} = useApi();

    const formatFeedback = (feedback: Feedback): Feedback => ({
        ...feedback,
        feedback_date_time: formatDate(feedback.feedback_date).time,
        feedback_date_date: formatDate(feedback.feedback_date).date,
    });

    const fetchFeedbacks = useCallback(async () => {
        try {
            const data = await request('get', '/feedback');
            setFeedbacks(formatAndSortData(data, formatFeedback, 'feedback_date'));
        } catch {
        }
    }, [request]);

    const deleteFeedback = useCallback(async (id: number) => {
        try {
            await request('delete', `/feedback${id}`);
            setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
        } catch {
        }
    }, [request]);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    return {feedbacks, loading, error, fetchFeedbacks, deleteFeedback};
};

export default useFetchFeedback;
