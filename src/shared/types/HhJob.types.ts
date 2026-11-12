export type HhJobStatus = 'queued' | 'running' | 'done' | 'error' | 'cancelled';

export type HhJobKind = 'sendFeedback' | 'getFeedback';

/** POST /start|/refresh always returns 202 queue mode (detached hh-worker). */
export interface HhQueueResponse {
    message?: string;
    jobId?: string;
    mode?: 'queue';
}

export type HhApplyEndReason = 'last_page' | 'page_cap' | 'stopped' | 'aborted';

export interface HhApplySummary {
    /** HH SERP total after search/filters. */
    found?: number;
    success: number;
    skipped: number;
    failed: number;
    pages: number;
    endReason?: HhApplyEndReason;
}

export interface HhJobStatusResponse {
    id: string;
    kind: HhJobKind;
    status: HhJobStatus;
    createdAt: string;
    startedAt?: string;
    finishedAt?: string;
    error?: string;
    countersUpdated?: boolean;
    lastEvent?: string;
    lastEventAt?: string;
    captchaSrc?: string;
    /** Worker saved PNG — load via GET /jobs/:id/captcha-image. */
    hasCaptchaImage?: boolean;
    /** Worker blocked — submit answer via POST /jobs/:id/captcha. */
    awaitingCaptcha?: boolean;
    /** Present when sendFeedback finished (completion modal). */
    summary?: HhApplySummary;
}

export interface HhJobCompletion {
    found?: number;
    success: number;
    skipped: number;
    failed: number;
    pages?: number;
    endReason?: HhApplyEndReason;
    lastEvent?: string;
}
