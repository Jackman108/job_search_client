export type HhJobStatus = 'queued' | 'running' | 'done' | 'error';

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
}
