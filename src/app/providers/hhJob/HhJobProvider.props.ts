import type { HhJobKind, HhJobStatus, HhJobStatusResponse } from '@type';
import type { ActiveHhJob } from '@shared/utils/activeHhJob.utils';

export interface HhJobState {
    activeJob: ActiveHhJob | null;
    status: HhJobStatus | 'idle';
    isJobActive: boolean;
    watchJob: (jobId: string, kind: HhJobKind) => Promise<HhJobStatusResponse>;
    stopJob: () => Promise<void>;
    clearJob: () => void;
    isAbortError: (error: unknown) => boolean;
}
