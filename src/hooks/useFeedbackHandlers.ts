// src/hooks/useVacancyHandlers.ts
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useState} from 'react';
import {Errors, HandleFeedbackParams, UseFeedbackHandlersParams,} from '../Interfaces/InterfaceForm.types';
import {useAuth} from '../context/useAuthContext';
import useSubmitFeedback from './fetch/useSubmitFeedback';

const useFeedbackHandlers = (): UseFeedbackHandlersParams => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const {token, isLoading, setIsLoading} = useAuth();
    const {feedbackSubmit, feedbackStop} = useSubmitFeedback();

    const handleInputChange = (setter: Dispatch<SetStateAction<string>>) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
    };

    const feedbackHandler = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const params: HandleFeedbackParams = {
            token,
            email,
            password,
            setErrors,
            setIsLoading,
        };
        try {
            await feedbackSubmit(params);
        } finally {
            setIsLoading(false);
        }
    }, [token, email, password, setIsLoading, feedbackSubmit]);

    const feedbackStopHandler = useCallback(async () => {
        await feedbackStop();
        setIsLoading(false);
    }, [setIsLoading, feedbackStop]);

    return {
        email,
        password,
        errors,
        feedbackHandler,
        feedbackStopHandler,
        isLoading,
        handleEmailChange: handleInputChange(setEmail),
        handlePasswordChange: handleInputChange(setPassword),
    };
};

export default useFeedbackHandlers;
