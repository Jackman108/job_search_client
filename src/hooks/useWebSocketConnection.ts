import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { WS_URL, API_URL } from '../config/serverConfig';

const useWebSocketConnection = (fetchVacanciesByUserId: () => void, setAlert: (message: string) => void) => {
  const { error: wsError } = useWebSocket({
    WS_URL,
    API_URL,
    fetchVacanciesByUserId,
    setAlert
  });

  useEffect(() => {
    if (wsError) {
      console.error('WebSocket error:', wsError);
    }
  }, [wsError]);
};

export default useWebSocketConnection;
