import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Trap Tab focus inside `container` while `active`. Restores prior focus on unmount.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(active: boolean): RefObject<T | null> {
    const containerRef = useRef<T | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!active) return;
        const node = containerRef.current;
        if (!node) return;

        previousFocusRef.current = document.activeElement as HTMLElement | null;
        const focusables = () =>
            Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => !el.hasAttribute('disabled'));

        focusables()[0]?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;
            const list = focusables();
            if (list.length === 0) {
                event.preventDefault();
                return;
            }
            const firstEl = list[0];
            const lastEl = list[list.length - 1];
            if (event.shiftKey && document.activeElement === firstEl) {
                event.preventDefault();
                lastEl.focus();
            } else if (!event.shiftKey && document.activeElement === lastEl) {
                event.preventDefault();
                firstEl.focus();
            }
        };

        node.addEventListener('keydown', onKeyDown);
        return () => {
            node.removeEventListener('keydown', onKeyDown);
            previousFocusRef.current?.focus?.();
        };
    }, [active]);

    return containerRef;
}
