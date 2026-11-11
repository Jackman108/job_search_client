export interface HhCaptchaModalProps {
    captchaSrc?: string;
    busy?: boolean;
    error?: string | null;
    onSubmit: (answer: string) => void | Promise<void>;
    onDismiss?: () => void;
}
