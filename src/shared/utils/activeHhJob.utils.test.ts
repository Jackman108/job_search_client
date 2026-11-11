import { clearActiveHhJob, endpointToHhJobKind, readActiveHhJob, writeActiveHhJob } from './activeHhJob.utils';

describe('activeHhJob.utils', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('maps endpoints to job kinds', () => {
        expect(endpointToHhJobKind('/start')).toBe('sendFeedback');
        expect(endpointToHhJobKind('/refresh')).toBe('getFeedback');
    });

    it('round-trips job id and kind in sessionStorage', () => {
        writeActiveHhJob({ jobId: 'job-1', kind: 'sendFeedback' });
        expect(readActiveHhJob()).toEqual({ jobId: 'job-1', kind: 'sendFeedback' });
        clearActiveHhJob();
        expect(readActiveHhJob()).toBeNull();
    });

    it('rejects malformed storage payloads', () => {
        sessionStorage.setItem('mh.activeHhJob', JSON.stringify({ jobId: 1, kind: 'sendFeedback' }));
        expect(readActiveHhJob()).toBeNull();
    });
});
