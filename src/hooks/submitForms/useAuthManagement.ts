import useSearchAuth from '../fetch/useSearchAuth';
import {useSearchFormContext} from '../../context/SearchFormContext';
import useFormState from "./useFormState";

const useAuthManagement = () => {
    const {auths: vacancyAuths, createSearchAuth, updateSearchAuth, deleteSearchAuth} = useSearchAuth();
    const {selectedAuthId, setSelectedAuthId} = useSearchFormContext();

    const selectedAuth = vacancyAuths?.find(v => v.id === selectedAuthId) || null;

    const {formValues} = useFormState(
        selectedAuth?.email || '',
        selectedAuth?.password || '',
    );
    const {email, password} = formValues;

    const handleCreateAuth = async () => {
        await createSearchAuth({email, password});
        setSelectedAuthId(null);
    };

    const handleUpdateAuth = async () => {
        if (selectedAuthId) {
            await updateSearchAuth({id: selectedAuthId, email, password});
        }
    };

    const handleDeleteAuth = async () => {
        if (selectedAuthId) {
            await deleteSearchAuth(selectedAuthId);
            setSelectedAuthId(null);
        }
    };

    return {
        vacancyAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useAuthManagement;