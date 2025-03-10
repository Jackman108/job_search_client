import {useEffect} from 'react';
import {API_URL, WS_URL} from '@config';
import {useWebSocket} from "@hooks";

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
