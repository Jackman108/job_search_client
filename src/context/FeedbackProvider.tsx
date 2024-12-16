import {FC, ReactNode, useMemo} from 'react';
import CaptchaAlert from '../UI/CaptchaAlert/CaptchaAlert';
import useAlert from '../hooks/useAlert';
import useWebSocketConnection from '../hooks/useWebSocketConnection';
import FeedbackContext from "./useFeedbackContext";
import useFetchFeedbacks from "../hooks/fetch/useFetchFeedbacks";

const FeedbackProvider: FC<{ children: ReactNode }> = ({children}) => {
    const {feedbacks, loading, error, fetchFeedbacks, deleteFeedback} = useFetchFeedbacks();
    const {alertState, setAlert, handleCloseAlert} = useAlert();

    useWebSocketConnection(fetchFeedbacks, setAlert);

    const contextValue = useMemo(
        () => ({feedbacks, loading, error, fetchFeedbacks, deleteFeedback}),
        [feedbacks, loading, error, fetchFeedbacks, deleteFeedback]);

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}
            {alertState.message && (
                <CaptchaAlert
                    message={alertState.message}
                    captchaSrc={alertState.captchaSrc}
                    onClose={handleCloseAlert}
                />
            )}
        </FeedbackContext.Provider>
    );
};

export default FeedbackProvider;
