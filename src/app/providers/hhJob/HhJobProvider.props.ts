import type { HhJobCompletion, HhJobKind, HhJobStatus, HhJobStatusResponse, HhLiveApplySummary } from '@type';
import type { ActiveHhJob } from '@shared/utils/activeHhJob.utils';

export interface HhJobState {
    activeJob: ActiveHhJob | null;
    status: HhJobStatus | 'idle';
    isJobActive: boolean;
    awaitingCaptcha: boolean;
    /** ISO time when current CAPTCHA wait started (modal timer). */
    captchaWaitingSince?: string;
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
    /** Live apply counters for in-panel banner. */
    liveSummary: HhLiveApplySummary | null;
    lastEvent?: string;
    watchJob: (jobId: string, kind: HhJobKind) => Promise<HhJobStatusResponse>;
    /** Optional kinds filter — apply stop should pass `['sendFeedback']` so refresh keeps running. */
    stopJob: (kinds?: HhJobKind[]) => Promise<void>;
    clearJob: () => void;
    submitCaptchaAnswer: (answer: string) => Promise<void>;
    requestCaptchaRefresh: () => Promise<void>;
    isAbortError: (error: unknown) => boolean;
}
