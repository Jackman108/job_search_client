import { endpointToHhJobKind, formatHhJobError, isHhQueueResponse, validateEmail, validateSearchUrl } from '@utils';
import { SearchSubmitParams } from '@entities/search';
import { useDataApi } from '@api';
import { useMutation } from '@tanstack/react-query';
import { shouldRedirectToServerUnavailable } from '@shared/utils/serverUnavailableRedirect';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';

const useSubmitRequest = () => {
    const { request } = useDataApi();
    const { watchJob, stopJob, isAbortError } = useHhJobContext();

    const submitMutation = useMutation<unknown, Error, { endpoint: string; data: Record<string, unknown> }>({
        mutationFn: async (params) => {
            const { endpoint, data } = params;
            return request('post', endpoint, data);
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

            // Queue mode: API returns 202 + jobId; app-level runner polls (survives panel close).
            if (isHhQueueResponse(result) && result.jobId) {
                await watchJob(result.jobId, endpointToHhJobKind(endpoint));
            }
        } catch (error) {
            if (isAbortError(error)) {
                return;
            }
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
        await stopJob();
    };

    return { handleSubmitRequest, handleStopRequest };
};

export default useSubmitRequest;
