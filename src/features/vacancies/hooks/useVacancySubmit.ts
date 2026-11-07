import { VacancySubmitParams } from '@features/vacancies/props/Vacancies.props';
import { useSubmitRequest } from '@hooks';
import { useVacancyContext } from '@app/providers/vacancy/useVacancyContext';

const useVacancySubmit = () => {
    const { handleSubmitRequest, handleStopRequest } = useSubmitRequest();
    const { loadData } = useVacancyContext();

    const vacancySubmit = async (formValues: VacancySubmitParams): Promise<void> => {
        try {
            await handleSubmitRequest({ ...formValues, endpoint: '/start' });
            await loadData();
        } catch {
            // Errors already surfaced via setErrors in useSubmitRequest.
        }
    };

    return { vacancySubmit, vacancyStop: handleStopRequest };
};

export default useVacancySubmit;
