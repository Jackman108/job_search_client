import type { HhJobCompletion, HhJobKind, HhJobStatus, HhJobStatusResponse } from '@type';
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
    /** Set when sendFeedback settles — show completion modal. */
    completion: HhJobCompletion | null;
    dismissCompletion: () => void;
    /** SERP «Найдено N…» toast while job is running. */
    foundNotice: string | null;
    dismissFoundNotice: () => void;
    watchJob: (jobId: string, kind: HhJobKind) => Promise<HhJobStatusResponse>;
    stopJob: () => Promise<void>;
    clearJob: () => void;
    submitCaptchaAnswer: (answer: string) => Promise<void>;
    isAbortError: (error: unknown) => boolean;
}
