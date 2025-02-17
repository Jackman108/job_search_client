import useApi from '../../api/useApi';
import {validateEmail, validateSearchUrl} from '../../utils/validateUtils';
import {Dispatch, SetStateAction} from "react";
import {Errors} from "../../Interfaces/InterfaceForm.types";

interface SubmitParams {
    email: string;
    password: string;
    position?: string;
    message?: string;
    vacancyUrl?: string;
    setErrors: Dispatch<SetStateAction<Errors>>
    setIsLoading: (loading: boolean) => void;
    endpoint: string;
}

const useSubmitRequest = () => {
    const {request} = useApi();

    const handleSubmitRequest = async ({
                                           email,
                                           password,
                                           position,
                                           message,
                                           vacancyUrl,
                                           setErrors,
                                           setIsLoading,
                                           endpoint
                                       }: SubmitParams): Promise<void> => {
        const {isValidEmail, emailError} = validateEmail(email);
        if (!isValidEmail) {
            setErrors(emailError);
            return;
        }

        if (vacancyUrl) {
            const {isValidSearchUrl, searchUrlError} = validateSearchUrl(vacancyUrl);
            if (!isValidSearchUrl) {
                setErrors(searchUrlError);
                return;
            }
        }

        try {
            setIsLoading(true);
            await request('post', endpoint, {email, password, position, message, vacancyUrl});
        } catch (error) {
            setErrors(emailError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopRequest = async (): Promise<void> => {
        try {
            await request('post', '/stop');
        } catch (error) {
            console.error('Stop error:', error);
        }
    };

    return {handleSubmitRequest, handleStopRequest};
};

export default useSubmitRequest;
