export interface WebSocketHook {
  connect: () => void;
  fetchVacancies: () => void;
  message: string | null;
  error: string | null;
  open: boolean;
}

export interface UseWebSocketParams {
  API_URL: string;
  WS_URL: string;
  fetchVacancies: () => void;
  setAlert: (message: string) => void;
}
