import {Feedback} from '../../Interfaces/InterfaceFeedback.types';
import {formatAndSortData, formatDate} from '../../utils/formatUtils';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useDataApi from "../../api/useDataApi";

const formatFeedback = (feedback: Feedback): Feedback => ({
    ...feedback,
    feedback_date_time: formatDate(feedback.feedback_date).time,
    feedback_date_date: formatDate(feedback.feedback_date).date,
});

const useFetchFeedback = () => {
    const {request} = useDataApi();
    const queryClient = useQueryClient();

    const fetchFeedbacks = async () => {
        const data = await request('get', '/feedback');
        return formatAndSortData(data, formatFeedback, 'feedback_date')
    };
    const {data: feedbacks, isLoading: loading, error, refetch: loadData} = useQuery<Feedback[], Error>({
        queryKey: ['feedbacks'],
        queryFn: fetchFeedbacks,
        staleTime: 1000 * 60 * 10,
    });
    const deleteFeedbackMutation = useMutation<void, Error, number>({
        mutationFn: async (id: number) => {
            await request('delete', `/feedback/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['feedbacks']});
        },
        onError: (err) => {
            console.error("Ошибка удаления feedback:", err);
        },
    });

    return {
        feedbacks: feedbacks || [],
        loading,
        error: error ? error.message : null,
        fetchFeedbacks: () => queryClient.invalidateQueries({queryKey: ['feedbacks']}),
        deleteFeedback: deleteFeedbackMutation.mutateAsync,
        loadData,
    };
};

export default useFetchFeedback;
