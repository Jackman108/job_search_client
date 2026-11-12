export interface HhJobDoneModalProps {
    found?: number;
    success: number;
    skipped: number;
    pages?: number;
    onClose: () => void;
}
