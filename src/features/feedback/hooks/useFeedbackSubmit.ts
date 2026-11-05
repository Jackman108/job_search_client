import {useSubmitRequest} from "@hooks";
import useFetchFeedbacks from "@features/feedback/hooks/useFetchFeedbacks";
import {HandleFeedbackParams} from "@features/feedback/props/Feedback.props";

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
