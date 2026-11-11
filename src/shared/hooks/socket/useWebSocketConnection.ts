import { useEffect } from 'react';
import { API_URL, WS_URL } from '@config';
import { useWebSocket } from '@hooks';

const useWebSocketConnection = (loadData: () => void, setAlert: (message: string) => void) => {
    const { error: wsError } = useWebSocket({
        API_URL,
        WS_URL,
        loadData,
        setAlert,
    });

    useEffect(() => {
        // Persist error in reducer only — avoid console spam on transient WS blips.
        void wsError;
    }, [wsError]);
};

export default useWebSocketConnection;
