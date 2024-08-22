import { useState, useCallback, useEffect, useRef } from 'react';
import { UseWebSocketParams, WebSocketHook } from '../Interfaces/Interface.types';
import useFetchVacancies from './useFetchVacancies';
import useFetchUserProfile from './useFetchUserProfile';

export const useWebSocket = ({
  WS_URL,
  API_URL,
  setAlert
}: UseWebSocketParams): WebSocketHook => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const { userProfile } = useFetchUserProfile();
  const { fetchVacanciesByUserId } = useFetchVacancies(API_URL);
  const connect = useCallback(() => {
    if (wsRef.current) {
      return;
    }
    console.log(`Connecting to WebSocket: ${WS_URL}`);
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setOpen(true);
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('WebSocket message received:', data);
      setMessage(data);
      switch (true) {
        case data === 'ERROR detected restart':
          setAlert('Некорректный Email или Пароль');
          break;
        case data === 'CAPTCHA detected restart':
          const captchaSrc = data.split(' ')[2];
          setAlert(`Нужен ввод капчи, попробуйте позже ${captchaSrc}`);
          break;
        case data === 'hh closed':
          setAlert(`Сайт закрыт, попробуйте позже ${captchaSrc}`);
          break;       
        default:
          break;
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Произошла ошибка при соединении с WebSocket');
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      setOpen(false);
      wsRef.current = null;
    };
    console.log('WebSocket object:', ws);
  }, [WS_URL, setAlert]);

  useEffect(() => {
    connect();
      fetchVacanciesByUserId();
      console.log('Fetched currentUser:', userProfile);

  }, [message, connect, fetchVacanciesByUserId, userProfile]);

  return {
    connect,
    message,
    error,
    open,
  };
};
