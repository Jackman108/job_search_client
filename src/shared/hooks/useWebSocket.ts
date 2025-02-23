import {useCallback, useEffect, useRef} from 'react';
import {UseWebSocketParams, WebSocketHook} from "@shared/types/WebSocket.types";
import {useAuth} from "@app/providers/auth/useAuthContext";
import {useWebSocketReducer} from "@hooks/useWebSocketReducer";
import {handleWebSocketMessage} from "@utils/handleWebSocketMessage";

const RECONNECT_INTERVAL = 5000;

export const useWebSocket = ({WS_URL, loadData, setAlert}: UseWebSocketParams): WebSocketHook => {
    const [state, dispatch] = useWebSocketReducer();
    const wsRef = useRef<WebSocket | null>(null);
    const {token} = useAuth();

    const handleMessage = useCallback((data: string) => {
        handleWebSocketMessage(data, loadData, setAlert);
    }, [loadData, setAlert]);

    const connect = useCallback(() => {
        if (!token) {
            console.warn('No token available for WebSocket connection');
            return;
        }

        if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) return;

        try {
            wsRef.current = new WebSocket(`${WS_URL}?token=${token.replace('Bearer ', '')}`);

            wsRef.current.onopen = () => {
                console.log('WebSocket connection established');
                dispatch({type: 'SET_OPEN', payload: true});
            };

            wsRef.current.onmessage = (event) => {
                dispatch({type: 'SET_MESSAGE', payload: event.data});
                handleMessage(event.data);
            };

            wsRef.current.onerror = (err) => {
                console.error('WebSocket Error:', err);
                dispatch({type: 'SET_ERROR', payload: 'WebSocket Error'});
            };

            wsRef.current.onclose = (event) => {
                console.log('WebSocket connection closed:', event.code, event.reason);
                dispatch({type: 'SET_OPEN', payload: false});
                wsRef.current = null;

                if (event.code !== 1000) {
                    console.warn('WebSocket closed unexpectedly. Reconnecting...');
                    setTimeout(connect, RECONNECT_INTERVAL);
                }
            };
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            dispatch({type: 'SET_ERROR', payload: 'WebSocket connection failed'});
            setTimeout(connect, RECONNECT_INTERVAL);
        }
    }, [dispatch, token, WS_URL, handleMessage]);

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
        loadData,
        message: state.message,
        error: state.error,
        open: state.open,
    };
};