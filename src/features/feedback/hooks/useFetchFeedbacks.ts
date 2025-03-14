import {formatAndSortData} from '@utils';
import {useFetchByType} from "@api";
import {useCallback} from "react";
import {formatFeedbackDate} from "@features/feedback/utils/formatFeedbackDate";
import {ACTION_TYPES} from "@config";
import {Feedback, feedbackConfig} from "@entities/feedback";

const useFetchFeedback = () => {
    const {fetchedData, loading, error, deleteItem, saveItem, loadData} = useFetchByType(feedbackConfig);

    const feedbacks = fetchedData.feedback ? formatAndSortData(fetchedData.feedback, formatFeedbackDate, 'feedback_date') : [];

    const deleteFeedback = useCallback(async (id: number) => {
        await deleteItem({type: ACTION_TYPES.FEEDBACK, id});
    }, [deleteItem]);

    const saveFeedback = useCallback(async (formData: Partial<Feedback>, isEditing: boolean, id?: number) => {
        await saveItem({type: ACTION_TYPES.FEEDBACK, id, formData, isEditing});
    }, [saveItem]);

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