import {useSubmitRequest} from "@hooks";
import {HandleFeedbackParams} from "@features/feedback/types/Feedback.types";
import useFetchFeedbacks from "@features/feedback/hooks/useFetchFeedbacks";

const useFeedbackSubmit = () => {
    const {handleSubmitRequest, handleStopRequest} = useSubmitRequest();
    const {loadData} = useFetchFeedbacks();

    const feedbackSubmit = async (formValues: HandleFeedbackParams): Promise<void> => {
        await handleSubmitRequest({...formValues, endpoint: '/refresh'});
        await loadData();
    };

    return {feedbackSubmit, feedbackStop: handleStopRequest};
};

export default useFeedbackSubmit;
