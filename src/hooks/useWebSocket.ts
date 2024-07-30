import { useState, useCallback, useEffect, useRef } from 'react';

export const useWebSocket = (wsUrl: string, fetchVacancies: () => void) => {
  const [message, setMessage] = useState<any>(null);
  const [error, setError] = useState<Event | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current) {
      console.log('WebSocket already connected');
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
      console.log('WebSocket message received:', event.data);
      setMessage(event.data);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError(event);
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
