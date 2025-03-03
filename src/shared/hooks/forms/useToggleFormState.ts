import {useCallback, useState} from 'react';

export const useToggleFormState = () => {
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = useCallback(() => {
        setShowForm(prev => !prev);
    }, []);

    return {
        showForm,
        handleToggleForm,
    };
};