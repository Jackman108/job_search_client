import { getManagementControlState } from './managementControlState.utils';
import { hasFilledRequiredFields } from './formRequired.utils';

describe('getManagementControlState', () => {
    it('enables New whenever not busy', () => {
        expect(
            getManagementControlState({
                busy: false,
                selectedId: null,
                isEditing: false,
                canCommit: false,
            }).canNew,
        ).toBe(true);
        expect(
            getManagementControlState({
                busy: true,
                selectedId: 1,
                isEditing: true,
                canCommit: true,
            }).canNew,
        ).toBe(false);
    });

    it('enables Save only when editing and canCommit', () => {
        expect(
            getManagementControlState({
                busy: false,
                selectedId: 1,
                isEditing: true,
                canCommit: true,
            }).canSave,
        ).toBe(true);
        expect(
            getManagementControlState({
                busy: false,
                selectedId: 1,
                isEditing: true,
                canCommit: false,
            }).canSave,
        ).toBe(false);
        expect(
            getManagementControlState({
                busy: false,
                selectedId: null,
                isEditing: false,
                canCommit: true,
            }).canSave,
        ).toBe(false);
    });

    it('enables Edit only for a saved profile in view mode', () => {
        expect(
            getManagementControlState({
                busy: false,
                selectedId: 3,
                isEditing: false,
                canCommit: false,
            }).canEdit,
        ).toBe(true);
        expect(
            getManagementControlState({
                busy: false,
                selectedId: 3,
                isEditing: true,
                canCommit: true,
            }).canEdit,
        ).toBe(false);
        expect(
            getManagementControlState({
                busy: false,
                selectedId: null,
                isEditing: false,
                canCommit: false,
            }).canEdit,
        ).toBe(false);
    });

    it('enables Delete only when a saved profile is selected', () => {
        expect(
            getManagementControlState({
                busy: false,
                selectedId: 2,
                isEditing: false,
                canCommit: false,
            }).canDelete,
        ).toBe(true);
        expect(
            getManagementControlState({
                busy: false,
                selectedId: null,
                isEditing: true,
                canCommit: true,
            }).canDelete,
        ).toBe(false);
    });
});

describe('hasFilledRequiredFields', () => {
    it('requires non-empty trimmed values for every key', () => {
        const filled = { email: 'a@b.c', password: 'x' };
        const blankEmail = { email: '  ', password: 'x' };
        const missingPassword: Record<string, string> = { email: 'a@b.c' };
        expect(hasFilledRequiredFields(filled, ['email', 'password'])).toBe(true);
        expect(hasFilledRequiredFields(blankEmail, ['email', 'password'])).toBe(false);
        expect(hasFilledRequiredFields(missingPassword, ['email', 'password'])).toBe(false);
    });
});
