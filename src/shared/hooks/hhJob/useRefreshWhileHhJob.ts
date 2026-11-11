import { useEffect } from 'react';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import type { HhJobKind } from '@type';

const LIVE_REFRESH_MS = 2500;

/**
 * While an HH job is active, periodically refetch table data (worker has no live WS push).
 */
const useRefreshWhileHhJob = (loadData: () => void | Promise<unknown>, kinds?: readonly HhJobKind[]): void => {
    const { isJobActive, activeJob } = useHhJobContext();

    useEffect(() => {
        if (!isJobActive || !activeJob) return;
        if (kinds && !kinds.includes(activeJob.kind)) return;

        void loadData();
        const timer = window.setInterval(() => {
            void loadData();
        }, LIVE_REFRESH_MS);

        return () => window.clearInterval(timer);
    }, [isJobActive, activeJob, loadData, kinds]);
};

export default useRefreshWhileHhJob;
