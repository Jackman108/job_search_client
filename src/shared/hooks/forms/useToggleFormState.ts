import {useCallback, useState} from 'react';

const useToggleFormState = () => {
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = useCallback(() => {
        setShowForm(prev => !prev);
    }, []);

    return {
        showForm,
        handleToggleForm,
    };
};

export default useToggleFormState;