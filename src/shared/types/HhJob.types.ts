export type HhJobStatus = 'queued' | 'running' | 'done' | 'error' | 'cancelled';

export type HhJobKind = 'sendFeedback' | 'getFeedback';

/** POST /start|/refresh may return this when HH_WORKER_MODE=queue (default). */
export interface HhQueueResponse {
    message?: string;
    jobId?: string;
    mode?: 'queue' | 'sync';
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
}
