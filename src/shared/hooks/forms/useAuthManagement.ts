import useSearchAuth from './useSearchAuth';
import {useSearchFormContext} from '@app/providers/search/useSearchFormContext';
import {SearchAuthData} from "@features/vacancies/types/SearchForm.types";

const useAuthManagement = (formValues: SearchAuthData) => {
    const {createSearchAuth, updateSearchAuth, deleteSearchAuth} = useSearchAuth();
    const {selectedAuthId, setSelectedAuthId} = useSearchFormContext();

    const handleCreateAuth = async () => {
        const newAuth = await createSearchAuth({email: formValues.email, password: formValues.password});
        if (newAuth?.id) {
            setSelectedAuthId(newAuth.id);
        }
    };

    const handleUpdateAuth = async () => {
        if (selectedAuthId) {
            await updateSearchAuth({id: selectedAuthId, email: formValues.email, password: formValues.password});
        }
    };

    const handleDeleteAuth = async () => {
        if (selectedAuthId) {
            await deleteSearchAuth(selectedAuthId);
            setSelectedAuthId(null);
        }
    };

    return {
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useAuthManagement;