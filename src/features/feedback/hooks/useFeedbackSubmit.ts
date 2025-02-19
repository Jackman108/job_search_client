import useSubmitRequest from "@hooks/forms/useSubmitRequest";
import {HandleFeedbackParams} from "@features/feedback/types/Feedback.types";

const useFeedbackSubmit = () => {
    const {handleSubmitRequest, handleStopRequest} = useSubmitRequest();

    const feedbackSubmit = async (formValues: HandleFeedbackParams): Promise<void> => {
        await handleSubmitRequest({...formValues, endpoint: '/refresh'});
    };

    return {feedbackSubmit, feedbackStop: handleStopRequest};
};

export default useFeedbackSubmit;
