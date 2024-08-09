import { useState, useCallback, useEffect, useRef } from 'react';
import { UseWebSocketParams, WebSocketHook } from '../Interfaces/Interface.types';

export const useWebSocket = ({ wsUrl, fetchVacancies, setAlert }: UseWebSocketParams): WebSocketHook => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current) {
      return;
    }
    console.log(`Connecting to WebSocket: ${wsUrl}`);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setOpen(true);
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('WebSocket message received:', data);
      setMessage(data);     
      if (data === 'ERROR detected restart') {
        setAlert('Некорректный Email или Пароль');
      } else if (data === 'CAPTCHA detected restart'){
        const captchaSrc = data.split(' ')[2];
        setAlert(`Нужен ввод капчи, попробуйте позже ${captchaSrc}`);
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
  }, [wsUrl]);

  useEffect(() => {
    connect();
    if (message) {
      fetchVacancies();
    }
  }, [message, fetchVacancies, connect]);

  return {
    connect,
    fetchVacancies,
    message,
    error,
    open,
  };
};
