import {UserProfile} from '../../Interfaces/InterfaceProfile.types';
import useDataApi from '../../api/useApi';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback} from "react";

const useFetchProfile = () => {
    const queryClient = useQueryClient();
    const {request} = useDataApi();

    const {
        data: userProfile, isLoading, error
    } = useQuery<UserProfile, Error>({
        queryKey: ['userProfile'],
        queryFn: async () => request('get', '/profile'),
        staleTime: 1000 * 60 * 10,
    });

    const changeUserProfile = useMutation<UserProfile, Error, UserProfile>({
            mutationFn: async (userProfile) => {
                return await request('put', '/profile', userProfile);
            },
            onSuccess: (data) => {
                queryClient.setQueryData(['userProfile'], data);
            },
        }
    )
    const fetchUserProfile = useCallback(() => {
        return queryClient.invalidateQueries({queryKey: ['userProfile']});
    }, [queryClient]);

    const setUserProfile = useCallback(
        (data: UserProfile | null) => {
            queryClient.setQueryData(['userProfile'], data);
        },
        [queryClient]
    );
    return {
        queryClient,
        userProfile: userProfile || null,
        isLoading,
        error,
        fetchUserProfile,
        changeUserProfile: changeUserProfile.mutateAsync,
        setUserProfile,
    };

}

export default useFetchProfile;
