export interface HhJobDoneModalProps {
    found?: number;
    success: number;
    skipped: number;
    failed?: number;
    pages?: number;
    onClose: () => void;
}
