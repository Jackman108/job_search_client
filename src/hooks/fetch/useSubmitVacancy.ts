// src/hooks/useVacancyHandlers.ts
import {HandleSubmitParams} from '../../Interfaces/InterfaceForm.types';
import useApi from '../../api/useApi';
import {validateEmail, validateSearchUrl} from '../../utils/validateUtils';

const useSubmitVacancy = () => {
    const {request} = useApi();

    const handleSubmit = async ({
                                    email,
                                    password,
                                    position,
                                    message,
                                    vacancyUrl,
                                    setErrors,
                                    setIsLoading,
                                }: HandleSubmitParams): Promise<void> => {

        const {isValidSearchUrl, searchUrlError} = validateSearchUrl(vacancyUrl);
        const {isValidEmail, emailError} = validateEmail(email);

        if (!isValidSearchUrl) {
            setErrors(searchUrlError);
            return;
        }

        if (!isValidEmail) {
            setErrors(emailError);
            return;
        }
        setIsLoading(true);
        await request('post', '/start', {email, password, position, message, vacancyUrl});
        setIsLoading(false);
    };

    const handleStop = async (): Promise<void> => {
        try {
            await request('post', '/stop');
        } catch (error) {
            console.error('Stop error:', error);
        }
    };

    return {handleSubmit, handleStop};
};

export default useSubmitVacancy;