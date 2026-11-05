import {VacancySubmitParams} from '@features/vacancies/props/Vacancies.props';
import {useSubmitRequest} from "@hooks";

const useVacancySubmit = () => {
    const {handleSubmitRequest, handleStopRequest} = useSubmitRequest();

    const vacancySubmit = async (formValues: VacancySubmitParams): Promise<void> => {
        await handleSubmitRequest({...formValues, endpoint: '/start'});
    };

    return {vacancySubmit, vacancyStop: handleStopRequest};
};

export default useVacancySubmit;
