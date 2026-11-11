import { useEffect, useRef } from 'react';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import type { HhJobKind } from '@type';

/**
 * Refetch table when HH job progress advances (lastEventAt), not on a blind timer.
 * Skips while awaiting CAPTCHA — no vacancy changes until login continues.
 */
const useRefreshWhileHhJob = (loadData: () => void | Promise<unknown>, kinds?: readonly HhJobKind[]): void => {
    const { isJobActive, activeJob, tableRevision, awaitingCaptcha } = useHhJobContext();
    const lastRevisionRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (!isJobActive || !activeJob) {
            lastRevisionRef.current = undefined;
            return;
        }
        if (kinds && !kinds.includes(activeJob.kind)) return;
        if (awaitingCaptcha) return;
        if (!tableRevision || tableRevision === lastRevisionRef.current) return;

        lastRevisionRef.current = tableRevision;
        void loadData();
    }, [isJobActive, activeJob, tableRevision, awaitingCaptcha, loadData, kinds]);
};

export default useRefreshWhileHhJob;
