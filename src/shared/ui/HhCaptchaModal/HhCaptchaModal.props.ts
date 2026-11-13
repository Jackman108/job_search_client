export interface HhCaptchaModalProps {
    captchaSrc?: string;
    busy?: boolean;
    error?: string | null;
    onSubmit: (answer: string) => void | Promise<void>;
    onDismiss?: () => void;
    /** Re-fetch / ask worker to refresh Magritte picture. */
    onRefreshImage?: () => void | Promise<void>;
    /** ISO timestamp when awaitingCaptcha started (for wait timer). */
    waitingSince?: string;
}
