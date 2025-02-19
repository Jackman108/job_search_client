import {VacancySubmitParams} from '../types/Vacancies.types';
import useSubmitRequest from "@hooks/forms/useSubmitRequest";

const useVacancySubmit = () => {
    const {handleSubmitRequest, handleStopRequest} = useSubmitRequest();

    const handleSubmit = async (formValues: VacancySubmitParams): Promise<void> => {
        await handleSubmitRequest({...formValues, endpoint: '/start'});
    };

    return {handleSubmit, handleStop: handleStopRequest};
};

export default useVacancySubmit;
