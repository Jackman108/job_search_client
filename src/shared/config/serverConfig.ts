export const PORT = process.env.PORT || 3000;
// Prefer REACT_APP_* (CRA); keep bare names as fallback for tooling/docs.
export const WS_URL =
    process.env.REACT_APP_WS_URL || process.env.WS_URL || 'ws://localhost:8080';
export const API_URL =
    process.env.REACT_APP_API_URL || process.env.API_URL || 'http://localhost:8000';
export const AUTH_URL =
    process.env.REACT_APP_AUTH_URL || process.env.AUTH_URL || 'http://localhost:8001/api';