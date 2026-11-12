import { WS_ERRORS, WS_EVENTS } from '@config';

export const handleWebSocketMessage = (data: string, loadData: () => void, setAlert: (message: string) => void) => {
    const handleIdMessage = (message: string) => {
        const id = parseInt(message.split('ID ')[1], 10);
        if (!isNaN(id)) {
            loadData();
        } else {
            console.error('Invalid ID in message:', message);
        }
    };

    switch (true) {
        case data.startsWith(WS_EVENTS.VACANCY_SAVED):
            handleIdMessage(data);
            break;

        // HH apply/login CAPTCHA is poll SoT (GET /jobs/:id) — detached worker cannot push WS.
        case data === WS_EVENTS.ERROR_DETECTED:
        case data.startsWith(WS_EVENTS.CAPTCHA_DETECTED):
            break;

        case data === WS_EVENTS.HH_CLOSED:
            setAlert(WS_ERRORS.SITE_CLOSED);
            break;

        default:
            break;
    }
};
