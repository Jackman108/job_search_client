/** Shared gate: only real API outages map to /server-error. */
export type RedirectGateError = {
    name?: string;
    message?: string;
    code?: string;
    response?: { status?: number } | null;
};

export function shouldRedirectToServerUnavailable(error: RedirectGateError): boolean {
    if (error.response) {
        const status = error.response.status;
        return typeof status === 'number' && status >= 500;
    }
    if (error.code === 'ERR_CANCELED' || error.name === 'CanceledError') return false;
    return error.code === 'ERR_NETWORK' || error.message === 'Network Error';
}
