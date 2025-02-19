export interface WebSocketHook {
    connect: () => void;
    loadData: () => void;
    message: string | null;
    error: string | null;
    open: boolean;
}

export interface UseWebSocketParams {
    API_URL: string;
    WS_URL: string;
    loadData: () => void;
    setAlert: (message: string) => void;
}
