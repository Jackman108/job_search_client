import {isHhQueueResponse, pollHhJobUntilSettled, validateEmail, validateSearchUrl} from '@utils';
import {SearchSubmitParams} from '@features/vacancies/props/SearchForm.props';
import {useDataApi} from '@api';
import {useMutation} from '@tanstack/react-query';

const useSubmitRequest = () => {
    const { request } = useDataApi();

    const submitMutation = useMutation<unknown, Error, { endpoint: string; data: Record<string, unknown> }>({
        mutationFn: async (params) => {
            const { endpoint, data } = params;
            return request('post', endpoint, data);
        },
    });

    const stopMutation = useMutation<unknown, Error, void>({
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
        endpoint,
    }: SearchSubmitParams): Promise<void> => {
        const { isValidEmail, emailError } = validateEmail(email);

        if (!isValidEmail) {
            setErrors(emailError);
            return;
        }

        if (vacancyUrl) {
            const { isValidSearchUrl, searchUrlError } = validateSearchUrl(vacancyUrl);
            if (!isValidSearchUrl) {
                setErrors(searchUrlError);
                return;
            }
        }

        setIsLoading(true);
        try {
            const result = await submitMutation.mutateAsync({
                endpoint,
                data: { email, password, position, message, vacancyUrl },
            });

            // Queue mode (default): API returns 202 + jobId; wait for detached worker.
            if (isHhQueueResponse(result) && result.jobId) {
                await pollHhJobUntilSettled(request, result.jobId);
            }
        } catch (error) {
            setErrors({ email: (error as Error).message });
            throw error;
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

    return { handleSubmitRequest, handleStopRequest };
};

export default useSubmitRequest;
