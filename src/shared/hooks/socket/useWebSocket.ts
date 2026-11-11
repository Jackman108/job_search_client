import { useCallback, useEffect, useRef } from 'react';
import { UseWebSocketParams, WebSocketHook } from '@type';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { useWebSocketReducer } from '@hooks';
import { handleWebSocketMessage } from '@utils';
import { stripBearerPrefix } from '@shared/utils/toBearerAuthorization';

const RECONNECT_INTERVAL = 5000;

const useWebSocket = ({ WS_URL, loadData, setAlert }: UseWebSocketParams): WebSocketHook => {
    const [state, dispatch] = useWebSocketReducer();
    const wsRef = useRef<WebSocket | null>(null);
    const { token } = useAuth();

    const handleMessage = useCallback(
        (data: string) => {
            // Table reload / captcha alerts only — no console spam per frame.
            handleWebSocketMessage(data, loadData, setAlert);
        },
        [loadData, setAlert],
    );

    const connect = useCallback(() => {
        if (!token) return;

        if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) return;

        try {
            wsRef.current = new WebSocket(`${WS_URL}?token=${stripBearerPrefix(token)}`);

            wsRef.current.onopen = () => {
                dispatch({ type: 'SET_OPEN', payload: true });
            };

            wsRef.current.onmessage = (event) => {
                dispatch({ type: 'SET_MESSAGE', payload: event.data });
                handleMessage(event.data);
            };

            wsRef.current.onerror = () => {
                dispatch({ type: 'SET_ERROR', payload: 'WebSocket Error' });
            };

            wsRef.current.onclose = (event) => {
                dispatch({ type: 'SET_OPEN', payload: false });
                wsRef.current = null;

                if (event.code !== 1000) {
                    setTimeout(connect, RECONNECT_INTERVAL);
                }
            };
        } catch {
            dispatch({ type: 'SET_ERROR', payload: 'WebSocket connection failed' });
            setTimeout(connect, RECONNECT_INTERVAL);
        }
    }, [dispatch, token, WS_URL, handleMessage]);

    useEffect(() => {
        if (!token) return;

        connect();

        return () => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.close();
            }
        };
    }, [token, connect]);

    return {
        connect,
        loadData,
        message: state.message,
        error: state.error,
        open: state.open,
    };
};

export default useWebSocket;
