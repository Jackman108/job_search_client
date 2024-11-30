// src/hooks/useFetchDefault.ts
import {useCallback, useState} from 'react';
import useApi from '../api/api';
import {useAuth} from '../context/useAuthContext';

const useFetchDefault = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {setUserId} = useAuth();
    const {request} = useApi();

    const handleError = useCallback((message: string) => {
        setError(message);
    }, []);


    const createDefaultTables = useCallback(async (userId: string) => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            await request('post', '/default/vacancies', {userId});
            await request('post', '/default/feedback', {userId});
            await request('post', '/profile', {userId});
            setUserId(userId);
        } catch (err) {
            handleError('Registration error');
        } finally {
            setLoading(false);
        }
    }, [loading, handleError, setUserId, request]);


    return {createDefaultTables, loading, error};
};

export default useFetchDefault;
