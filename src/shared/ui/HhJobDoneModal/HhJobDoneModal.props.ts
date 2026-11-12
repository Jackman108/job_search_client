import type { HhApplyEndReason } from '@type';

export interface HhJobDoneModalProps {
    found?: number;
    success: number;
    skipped: number;
    failed?: number;
    pages?: number;
    endReason?: HhApplyEndReason;
    onClose: () => void;
}
