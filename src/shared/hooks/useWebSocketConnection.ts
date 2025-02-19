import {useEffect} from 'react';
import {useWebSocket} from './useWebSocket';
import {API_URL, WS_URL} from '@config/serverConfig';

const useWebSocketConnection = (loadData: () => void, setAlert: (message: string) => void
) => {
    const {error: wsError} = useWebSocket({
        WS_URL,
        API_URL,
        loadData,
        setAlert
    });

    useEffect(() => {
        if (wsError) {
            console.error('WebSocket error:', wsError);
        }
    }, [wsError]);
};

export default useWebSocketConnection;
