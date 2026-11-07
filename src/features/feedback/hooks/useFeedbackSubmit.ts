import { useSubmitRequest } from '@hooks';
import useFetchFeedbacks from '@features/feedback/hooks/useFetchFeedbacks';
import { HandleFeedbackParams } from '@features/feedback/props/Feedback.props';

const useFeedbackSubmit = () => {
    const { handleSubmitRequest, handleStopRequest } = useSubmitRequest();
    const { loadData } = useFetchFeedbacks();

    const feedbackSubmit = async (formValues: HandleFeedbackParams): Promise<void> => {
        try {
            await handleSubmitRequest({ ...formValues, endpoint: '/refresh' });
            await loadData();
        } catch {
            // Errors already surfaced via setErrors in useSubmitRequest.
        }
    };

    return { feedbackSubmit, feedbackStop: handleStopRequest };
};

export default useFeedbackSubmit;
