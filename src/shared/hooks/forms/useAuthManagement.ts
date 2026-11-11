import useSearchAuth from './useSearchAuth';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import { SearchAuthData } from '@entities/search';

type CreatedId = { id?: number };

const useAuthManagement = (formValues: Pick<SearchAuthData, 'email' | 'password'>, resetAuthToBlank: () => void) => {
    const { createSearchAuth, updateSearchAuth, deleteSearchAuth } = useSearchAuth();
    const { selectedAuthId, setSelectedAuthId } = useSearchFormContext();

    const handleStartCreateAuth = () => {
        setSelectedAuthId(null);
        resetAuthToBlank();
    };

    const handleCreateAuth = async () => {
        try {
            const created = (await createSearchAuth({
                email: formValues.email,
                password: formValues.password,
            })) as CreatedId;
            if (created?.id) {
                setSelectedAuthId(created.id);
            }
        } catch (error) {
            console.error('Failed to create search auth', error);
        }
    };

    const handleUpdateAuth = async () => {
        if (!selectedAuthId) return;
        try {
            await updateSearchAuth({
                id: selectedAuthId,
                email: formValues.email,
                password: formValues.password,
            });
        } catch (error) {
            console.error('Failed to update search auth', error);
        }
    };

    const handleDeleteAuth = async () => {
        if (!selectedAuthId) return;
        try {
            await deleteSearchAuth(selectedAuthId);
            setSelectedAuthId(null);
            resetAuthToBlank();
        } catch (error) {
            console.error('Failed to delete search auth', error);
        }
    };

    return {
        handleStartCreateAuth,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useAuthManagement;
