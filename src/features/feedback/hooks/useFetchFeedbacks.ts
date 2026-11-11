import { formatAndSortData } from '@utils';
import { useFetchByType } from '@api';
import { useCallback } from 'react';
import { ACTION_TYPES } from '@config';
import { Feedback, feedbackConfig, formatFeedbackDate } from '@entities/feedback';
import { useRefreshWhileHhJob } from '@hooks';
import type { HhJobKind } from '@type';

const FEEDBACK_JOB_KINDS: readonly HhJobKind[] = ['getFeedback'];

const useFetchFeedback = () => {
    const { fetchedData, loading, error, deleteItem, saveItem, loadData } = useFetchByType(feedbackConfig);
    useRefreshWhileHhJob(loadData, FEEDBACK_JOB_KINDS);

    const feedbacks = fetchedData.feedback
        ? formatAndSortData(fetchedData.feedback, formatFeedbackDate, 'feedback_date')
        : [];

    const deleteFeedback = useCallback(
        async (id: number) => {
            await deleteItem({ type: ACTION_TYPES.FEEDBACK, id });
        },
        [deleteItem],
    );

    const saveFeedback = useCallback(
        async (formData: Partial<Feedback>, isEditing: boolean, id?: number) => {
            await saveItem({ type: ACTION_TYPES.FEEDBACK, id, formData, isEditing });
        },
        [saveItem],
    );

    return {
        feedbacks,
        loading,
        error,
        deleteFeedback,
        saveFeedback,
        loadData,
    };
};

export default useFetchFeedback;
