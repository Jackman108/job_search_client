import {createContext, useContext} from 'react';
import {FeedbackContextType} from "@app/providers/feedback/FeedbackProvider.props";

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedbackContext = () => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
};
export default FeedbackContext;