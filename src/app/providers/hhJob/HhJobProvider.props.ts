import type { HhJobKind, HhJobStatus, HhJobStatusResponse } from '@type';
import type { ActiveHhJob } from '@shared/utils/activeHhJob.utils';

export interface HhJobState {
    activeJob: ActiveHhJob | null;
    status: HhJobStatus | 'idle';
    isJobActive: boolean;
    awaitingCaptcha: boolean;
    captchaSrc?: string;
    /** Changes when worker lastEventAt updates — use to refetch tables. */
    tableRevision?: string;
    captchaBusy: boolean;
    captchaError: string | null;
    watchJob: (jobId: string, kind: HhJobKind) => Promise<HhJobStatusResponse>;
    stopJob: () => Promise<void>;
    clearJob: () => void;
    submitCaptchaAnswer: (answer: string) => Promise<void>;
    isAbortError: (error: unknown) => boolean;
}
