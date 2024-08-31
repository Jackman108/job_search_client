import { useCallback, useEffect, useRef, useState } from 'react';
import { UseWebSocketParams, WebSocketHook } from '../Interfaces/InterfaceWebSocket.types';
import { useAuth } from '../context/useAuthContext';

const RECONNECT_INTERVAL = 5000;

export const useWebSocket = ({
  WS_URL,
  fetchVacancies,
  setAlert
}: UseWebSocketParams): WebSocketHook => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { userId } = useAuth();

  const connect = useCallback(() => {
    if (!userId) {
      console.warn('User ID is not available');
      return;
    }
    if (wsRef.current) {
      console.warn('WebSocket already connected');
      return;
    }
    const ws = new WebSocket(`${WS_URL}?userId=${userId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setOpen(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('WebSocket message received:', data);
      setMessage(data);
      switch (true) {
        case data.startsWith('Vacancy has been successfully saved with ID'):
          const id = data.split('ID ')[1];
          console.log(`Vacancy with ID ${id} was saved`);
          fetchVacancies();
          break;
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

  }, [userId, WS_URL, setAlert, fetchVacancies]);

  useEffect(() => {
    if (userId) {
      const timer = setTimeout(() => {
        connect();
      }, RECONNECT_INTERVAL);
      return () => {
        clearTimeout(timer);
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [userId, connect]);

  return {
    connect,
    fetchVacancies,
    message,
    error,
    open,
  };
};
