export interface HhJobDoneModalProps {
    success: number;
    skipped: number;
    pages?: number;
    onClose: () => void;
}
