import { useEffect, useRef } from 'react';

const TITLE_FLASH = '⚠ Капча HH';

/**
 * When CAPTCHA awaits answer: flash document title + optional Notification.
 * Restores previous title on clear.
 */
const useCaptchaAttention = (awaitingCaptcha: boolean) => {
    const baseTitleRef = useRef<string | null>(null);
    const notifiedRef = useRef(false);

    useEffect(() => {
        if (!awaitingCaptcha) {
            if (baseTitleRef.current != null) {
                document.title = baseTitleRef.current;
                baseTitleRef.current = null;
            }
            notifiedRef.current = false;
            return;
        }

        if (baseTitleRef.current == null) {
            baseTitleRef.current = document.title;
        }

        let on = false;
        const id = window.setInterval(() => {
            on = !on;
            document.title = on ? TITLE_FLASH : baseTitleRef.current || TITLE_FLASH;
        }, 1200);

        if (!notifiedRef.current && typeof Notification !== 'undefined') {
            notifiedRef.current = true;
            const show = () => {
                try {
                    new Notification('Market Hunter', {
                        body: 'HH просит капчу — введите код в модалке',
                        tag: 'mh-hh-captcha',
                    });
                } catch {
                    // ignore
                }
            };
            if (Notification.permission === 'granted') show();
            else if (Notification.permission !== 'denied') {
                void Notification.requestPermission().then((p) => {
                    if (p === 'granted') show();
                });
            }
        }

        return () => {
            window.clearInterval(id);
            if (baseTitleRef.current != null) {
                document.title = baseTitleRef.current;
            }
        };
    }, [awaitingCaptcha]);
};

export default useCaptchaAttention;
