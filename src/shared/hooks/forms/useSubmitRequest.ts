import { formatHhJobError, isHhQueueResponse, pollHhJobUntilSettled, validateEmail, validateSearchUrl } from '@utils';
import { SearchSubmitParams } from '@entities/search';
import { useDataApi } from '@api';
import { useMutation } from '@tanstack/react-query';
import { shouldRedirectToServerUnavailable } from '@shared/utils/serverUnavailableRedirect';

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
            // Real API outage → let interceptor/redirect handle; do not map as HH job copy.
            if (shouldRedirectToServerUnavailable(error as { response?: { status?: number } })) {
                throw error;
            }
            const raw = error instanceof Error ? error.message : String(error);
            setErrors({ email: formatHhJobError(raw) });
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
