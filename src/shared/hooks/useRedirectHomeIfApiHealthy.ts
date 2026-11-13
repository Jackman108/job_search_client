import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@config';
import { probeBackendHealth } from '@shared/utils/probeBackendHealth';

/**
 * On /server-error: if backend /health is OK, leave the error page for `/`.
 */
const useRedirectHomeIfApiHealthy = (): { checking: boolean } => {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let cancelled = false;
        void probeBackendHealth(API_URL).then((ok) => {
            if (cancelled) return;
            if (ok) {
                navigate('/', { replace: true });
                return;
            }
            setChecking(false);
        });
        return () => {
            cancelled = true;
        };
    }, [navigate]);

    return { checking };
};

export default useRedirectHomeIfApiHealthy;
