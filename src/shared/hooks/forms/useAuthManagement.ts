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

    const handleSaveAuth = async () => {
        if (selectedAuthId) {
            await updateSearchAuth({
                id: selectedAuthId,
                email: formValues.email,
                password: formValues.password,
            });
            return;
        }

        const created = (await createSearchAuth({
            email: formValues.email,
            password: formValues.password,
        })) as CreatedId;
        if (created?.id) {
            setSelectedAuthId(created.id);
        }
    };

    const handleDeleteAuth = async () => {
        if (!selectedAuthId) return;
        await deleteSearchAuth(selectedAuthId);
        setSelectedAuthId(null);
        resetAuthToBlank();
    };

    return {
        handleStartCreateAuth,
        handleSaveAuth,
        handleDeleteAuth,
    };
};

export default useAuthManagement;
