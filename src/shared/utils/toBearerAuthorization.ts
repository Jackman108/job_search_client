/** Normalize raw JWT or existing Bearer header for Authorization. */
export function toBearerAuthorization(token: string): string {
    const trimmed = token.trim();
    if (!trimmed) {
        throw new Error('Token is missing');
    }
    return trimmed.startsWith('Bearer ') ? trimmed : `Bearer ${trimmed}`;
}

/** Strip optional Bearer prefix (WS query, jwt-decode). */
export function stripBearerPrefix(token: string): string {
    const trimmed = token.trim();
    return trimmed.startsWith('Bearer ') ? trimmed.slice('Bearer '.length) : trimmed;
}
