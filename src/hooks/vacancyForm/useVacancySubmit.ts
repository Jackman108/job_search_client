// src/hooks/useVacancySubmit.ts
import useApi from '../../api/useApi';
import {validateEmail, validateSearchUrl} from '../../utils/validateUtils';
import {VacancySubmitParams} from '../../Interfaces/InterfaceVacancy.types';

const useVacancySubmit = () => {
    const {request} = useApi();

    const handleSubmit = async (
        formValues: VacancySubmitParams,
    ): Promise<void> => {
        const {email, password, position, message, vacancyUrl, setErrors, setIsLoading,} = formValues;

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

export default useVacancySubmit;