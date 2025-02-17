import {HandleFeedbackParams} from '../../../Interfaces/InterfaceForm.types';
import useSubmitRequest from "../useSubmitRequest";

const useFeedbackSubmit = () => {
    const {handleSubmitRequest, handleStopRequest} = useSubmitRequest();

    const feedbackSubmit = async (formValues: HandleFeedbackParams): Promise<void> => {
        await handleSubmitRequest({...formValues, endpoint: '/refresh'});
    };

    return {feedbackSubmit, feedbackStop: handleStopRequest};
};

export default useFeedbackSubmit;
