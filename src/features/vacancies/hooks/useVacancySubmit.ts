import {VacancySubmitParams} from '../types/Vacancies.types';
import useSubmitRequest from "@hooks/forms/useSubmitRequest";

const useVacancySubmit = () => {
    const {handleSubmitRequest, handleStopRequest} = useSubmitRequest();

    const vacancySubmit = async (formValues: VacancySubmitParams): Promise<void> => {
        await handleSubmitRequest({...formValues, endpoint: '/start'});
    };

    return {vacancySubmit, vacancyStop: handleStopRequest};
};

export default useVacancySubmit;
