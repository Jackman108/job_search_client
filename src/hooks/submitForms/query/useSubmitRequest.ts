import {validateEmail, validateSearchUrl} from '../../../utils/validateUtils';
import {SubmitParams} from "../../../Interfaces/InterfaceForm.types";
import useDataApi from "../../../api/useDataApi";
import {useMutation} from "@tanstack/react-query";


const useSubmitRequest = () => {
    const {request} = useDataApi();

    const submitMutation = useMutation<
        unknown,
        Error,
        { endpoint: string; data: any }
    >({
        mutationFn: async (params) => {
            const {endpoint, data} = params;
            return request('post', endpoint, data);
        },
    });

    const stopMutation = useMutation<
        unknown,
        Error,
        void
    >({
        mutationFn: async () => {
            return request('post', '/stop', {});
        },
    });

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

        setIsLoading(true);
        try {
            await submitMutation.mutateAsync({
                endpoint,
                data: {email, password, position, message, vacancyUrl},
            });
        } catch (error) {
            setErrors({email: (error as Error).message});
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopRequest = async (): Promise<void> => {
        try {
            await stopMutation.mutateAsync();
        } catch (error) {
            console.error('Stop error:', error);
        }
    };

    return {handleSubmitRequest, handleStopRequest};
};

export default useSubmitRequest;
