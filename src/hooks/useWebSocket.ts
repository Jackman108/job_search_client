import { useState, useCallback, useEffect, useRef } from 'react';
import { UseWebSocketParams, WebSocketHook } from '../Interfaces/Interface.types';
import useFetchAuth from './useFetchAuth';
import useFetchVacancies from './useFetchVacancies';

export const useWebSocket = ({
  WS_URL,
  API_URL,
  setAlert
}: UseWebSocketParams): WebSocketHook => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const { currentUser } = useFetchAuth();
  const { fetchVacanciesByUserId, fetchVacanciesByProfileId } = useFetchVacancies(API_URL);
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
        case data.startsWith('userId:'):
          const [_, currentUser, token] = data.split(' ');
          if (currentUser && token) fetchVacanciesByUserId(currentUser.id, token);
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
  }, [WS_URL, setAlert, fetchVacanciesByUserId, fetchVacanciesByProfileId]);

  useEffect(() => {
    connect();
    if (message && currentUser) {
      const userId = currentUser.id.toString();
      const token = localStorage.getItem('token') || '';
      fetchVacanciesByUserId(userId, token);
      fetchVacanciesByProfileId(userId.toString(), token);
    }
  }, [message, connect, fetchVacanciesByUserId, fetchVacanciesByProfileId, currentUser]);

  return {
    connect,
    message,
    error,
    open,
  };
};
