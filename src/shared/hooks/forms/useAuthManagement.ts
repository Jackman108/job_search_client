import useSearchAuth from './useSearchAuth';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import { SearchAuthData } from '@entities/search';

const useAuthManagement = (formValues: SearchAuthData) => {
    const { createSearchAuth, updateSearchAuth, deleteSearchAuth } = useSearchAuth();
    const { selectedAuthId, setSelectedAuthId } = useSearchFormContext();

    const handleCreateAuth = async () => {
        try {
            const newAuth = await createSearchAuth({ email: formValues.email, password: formValues.password });
            if (newAuth?.id) {
                setSelectedAuthId(newAuth.id);
            }
        } catch (error) {
            console.error('Failed to create search auth', error);
        }
    };

    const handleUpdateAuth = async () => {
        if (!selectedAuthId) return;
        try {
            await updateSearchAuth({ id: selectedAuthId, email: formValues.email, password: formValues.password });
        } catch (error) {
            console.error('Failed to update search auth', error);
        }
    };

    const handleDeleteAuth = async () => {
        if (!selectedAuthId) return;
        try {
            await deleteSearchAuth(selectedAuthId);
            setSelectedAuthId(null);
        } catch (error) {
            console.error('Failed to delete search auth', error);
        }
    };

    return {
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useAuthManagement;
