import type { HhApplyEndReason } from '@type';

export interface HhJobDoneModalProps {
    found?: number;
    foundListed?: number;
    applyablePage1?: number;
    alreadyInDb?: number;
    success: number;
    skipped: number;
    failed?: number;
    pages?: number;
    endReason?: HhApplyEndReason;
    onClose: () => void;
}
