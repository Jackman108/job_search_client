export interface WebSocketHook {
  connect: () => void;
  fetchVacanciesByUserId: () => void;
  message: string | null;
  error: string | null;
  open: boolean;
}

export interface UseWebSocketParams {
  API_URL: string;
  WS_URL: string;
  fetchVacanciesByUserId: () => void;
  setAlert: (message: string) => void;
}
