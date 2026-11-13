import { getManagementControlState } from './managementControlState.utils';
import { getScriptControlState } from './scriptControlState.utils';

describe('getScriptControlState', () => {
    it('allows Start only when idle, not editing and fields are valid', () => {
        expect(getScriptControlState({ isLoading: false, isEditing: false, canCommit: true }).canStart).toBe(true);
        expect(getScriptControlState({ isLoading: false, isEditing: true, canCommit: true }).canStart).toBe(false);
        expect(getScriptControlState({ isLoading: true, isEditing: false, canCommit: true }).canStart).toBe(false);
        expect(getScriptControlState({ isLoading: false, isEditing: false, canCommit: false }).canStart).toBe(false);
    });

    it('allows Stop only while a job is active, even if editing flag is set', () => {
        expect(getScriptControlState({ isLoading: true, isEditing: false, canCommit: true }).canStop).toBe(true);
        expect(getScriptControlState({ isLoading: true, isEditing: true, canCommit: false }).canStop).toBe(true);
        expect(getScriptControlState({ isLoading: false, isEditing: false, canCommit: true }).canStop).toBe(false);
    });
});

describe('script vs profile control matrix', () => {
    const profile = (isLoading: boolean, isEditing: boolean, canCommit: boolean, selectedId: number | null) => ({
        script: getScriptControlState({ isLoading, isEditing, canCommit }),
        mgmt: getManagementControlState({ busy: isLoading, selectedId, isEditing, canCommit }),
    });

    it('while a job runs: only Stop is enabled', () => {
        const { script, mgmt } = profile(true, false, true, 1);
        expect(script).toEqual({ canStart: false, canStop: true });
        expect(mgmt).toEqual({ canNew: false, canSave: false, canEdit: false, canDelete: false });
    });

    it('while editing a profile: Start is off, Save follows canCommit', () => {
        const { script, mgmt } = profile(false, true, true, 1);
        expect(script).toEqual({ canStart: false, canStop: false });
        expect(mgmt.canSave).toBe(true);
        expect(mgmt.canEdit).toBe(false);
    });

    it('idle saved profile: Start + Edit + Delete + New, no Save/Stop', () => {
        const { script, mgmt } = profile(false, false, true, 1);
        expect(script).toEqual({ canStart: true, canStop: false });
        expect(mgmt).toEqual({ canNew: true, canSave: false, canEdit: true, canDelete: true });
    });
});
