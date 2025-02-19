import {FC, ReactNode, useMemo} from 'react';
import CaptchaAlert from '@ui/CaptchaAlert/CaptchaAlert';
import useAlert from '@hooks/useAlert';
import useWebSocketConnection from '@hooks/useWebSocketConnection';
import FeedbackContext from "./useFeedbackContext";
import useFetchFeedbacks from "@features/feedback/hooks/useFetchFeedbacks";

const FeedbackProvider: FC<{ children: ReactNode }> = ({children}) => {
    const {feedbacks, loading, error, fetchFeedbacks, deleteFeedback, loadData} = useFetchFeedbacks();
    const {alertState, setAlert, handleCloseAlert} = useAlert();

    useWebSocketConnection(loadData, setAlert);

    const contextValue = useMemo(
        () => ({feedbacks, loading, error, fetchFeedbacks, deleteFeedback, loadData}),
        [feedbacks, loading, error, fetchFeedbacks, deleteFeedback, loadData]);

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
