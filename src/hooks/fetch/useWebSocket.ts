import {useCallback, useEffect, useRef, useState} from 'react';
import {UseWebSocketParams, WebSocketHook} from '../../Interfaces/InterfaceWebSocket.types';
import {useAuth} from '../../context/useAuthContext';

const RECONNECT_INTERVAL = 5000;

export const useWebSocket = ({
                                 WS_URL,
                                 API_URL,
                                 fetchVacancies,
                                 setAlert
                             }: UseWebSocketParams): WebSocketHook => {

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const wsRef = useRef<WebSocket | null>(null);
    const {token} = useAuth();

    const connect = useCallback(() => {
        if (!token) {
            console.warn('No token available for WebSocket connection');
            return;
        }

        if (wsRef.current?.readyState === WebSocket.OPEN) {
            console.warn('WebSocket already connected');
            return;
        }

        if (wsRef.current?.readyState === WebSocket.CONNECTING) {
            return;
        }

        wsRef.current = new WebSocket(`${WS_URL}?token=${token.replace('Bearer ', '')}`);

        wsRef.current.onopen = () => {
            console.log('WebSocket connection established');
            setOpen(true);
        };

        wsRef.current.onmessage = (event) => {
            const data = event.data;
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

        wsRef.current.onerror = (err) => {
            console.error('WebSocket Error:', err);
            setError('WebSocket Error');
        };

        wsRef.current.onclose = () => {
            console.log('WebSocket connection closed');
            setOpen(false);
            wsRef.current = null;
            setTimeout(connect, RECONNECT_INTERVAL);
        };


    }, [token, WS_URL, setAlert, fetchVacancies]);

    useEffect(() => {
        if (!token) {
            console.warn('No authorization token');
            return;
        }

        connect();

        return () => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.close();
            }
        };
    }, [token, connect]);

    return {
        connect,
        fetchVacancies,
        message,
        error,
        open,
    };
};
