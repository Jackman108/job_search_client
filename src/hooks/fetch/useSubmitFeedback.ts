// src/hooks/useVacancyHandlers.ts
import {HandleFeedbackParams} from '../../Interfaces/InterfaceForm.types';
import useApi from '../../api/useApi';
import {validateEmail} from '../../utils/validateUtils';

const useSubmitFeedback = () => {
    const {request} = useApi();

    const feedbackSubmit = async ({
                                      email,
                                      password,
                                      setErrors,
                                      setIsLoading,
                                  }: HandleFeedbackParams): Promise<void> => {
        const {isValidEmail, emailError} = validateEmail(email);

        if (!isValidEmail) {
            setErrors(emailError);
            return;
        }

        try {
            await request('post', '/refresh', {email, password});
        } catch (error) {
            setErrors({email: 'Ошибка при отправке запроса'});
        } finally {
            setIsLoading(false);
        }
    };

    const feedbackStop = async (): Promise<void> => {
        try {
            await request('post', '/stop');
        } catch (error) {
            console.error('Stop error:', error);
        }
    };

    return {feedbackSubmit, feedbackStop};
};

export default useSubmitFeedback;