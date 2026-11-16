import { useEffect, useRef } from 'react';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import type { HhJobKind } from '@type';

/**
 * Refetch table when HH job progress advances (lastEventAt), and once when that job settles.
 * Skips while awaiting CAPTCHA — no vacancy changes until login continues.
 */
const useRefreshWhileHhJob = (loadData: () => void | Promise<unknown>, kinds?: readonly HhJobKind[]): void => {
    const { isJobActive, activeJob, tableRevision, awaitingCaptcha } = useHhJobContext();
    const lastRevisionRef = useRef<string | undefined>(undefined);
    const trackedKindRef = useRef<HhJobKind | null>(null);

    useEffect(() => {
        const kindMatches = (kind: HhJobKind | undefined): boolean => !!kind && (!kinds || kinds.includes(kind));

        if (isJobActive && activeJob && kindMatches(activeJob.kind)) {
            trackedKindRef.current = activeJob.kind;
            if (awaitingCaptcha) return;
            if (!tableRevision || tableRevision === lastRevisionRef.current) return;
            lastRevisionRef.current = tableRevision;
            void loadData();
            return;
        }

        if (trackedKindRef.current && kindMatches(trackedKindRef.current)) {
            trackedKindRef.current = null;
            lastRevisionRef.current = undefined;
            void loadData();
            return;
        }

        lastRevisionRef.current = undefined;
    }, [isJobActive, activeJob, tableRevision, awaitingCaptcha, loadData, kinds]);
};

export default useRefreshWhileHhJob;
