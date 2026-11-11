import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    id: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
}

export const decodeToken = (token: string): DecodedToken => {
    try {
        const raw = token.startsWith('Bearer ') ? token.slice('Bearer '.length) : token;
        return jwtDecode<DecodedToken>(raw);
    } catch {
        throw new Error('Invalid token');
    }
};

export const isTokenExpired = (exp: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
};
