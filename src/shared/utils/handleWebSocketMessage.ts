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

        case data === WS_EVENTS.ERROR_DETECTED:
            setAlert(WS_ERRORS.INVALID_EMAIL_PASSWORD);
            break;

        case data.startsWith(WS_EVENTS.CAPTCHA_DETECTED):
            const captchaSrc = data.split(' ')[2];
            if (captchaSrc) {
                setAlert(`${WS_ERRORS.CAPTCHA_REQUIRED} ${captchaSrc}`);
            } else {
                console.error('Invalid captcha source in message:', data);
            }
            break;

        case data === WS_EVENTS.HH_CLOSED:
            setAlert(WS_ERRORS.SITE_CLOSED);
            break;

        default:
            break;
    }
};
