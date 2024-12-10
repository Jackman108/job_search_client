import { useEffect } from 'react';
import { useWebSocket } from './fetch/useWebSocket';
import { WS_URL, API_URL } from '../config/serverConfig';

const useWebSocketConnection = (fetchVacancies: () => void, setAlert: (message: string) => void) => {
  const { error: wsError } = useWebSocket({
    WS_URL,
    API_URL,
    fetchVacancies,
    setAlert
  });

  useEffect(() => {
    if (wsError) {
      console.error('WebSocket error:', wsError);
    }
  }, [wsError]);
};

export default useWebSocketConnection;
