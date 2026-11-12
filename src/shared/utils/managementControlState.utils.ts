export type ManagementControlStateArgs = {
    busy: boolean;
    selectedId: number | null;
    isEditing: boolean;
    /** Required fields valid; Save stays off unless also editing. */
    canCommit: boolean;
};

export type ManagementControlState = {
    canNew: boolean;
    canSave: boolean;
    canEdit: boolean;
    canDelete: boolean;
};

/**
 * Active/inactive matrix for New / Save / Edit / Delete on profile chrome.
 * New: always when not busy. Save: editing + canCommit (required fields).
 * Edit: selected + view mode. Delete: existing saved selection only.
 */
export const getManagementControlState = ({
    busy,
    selectedId,
    isEditing,
    canCommit,
}: ManagementControlStateArgs): ManagementControlState => {
    const hasSaved = selectedId != null;

    return {
        canNew: !busy,
        canSave: !busy && isEditing && canCommit,
        canEdit: !busy && hasSaved && !isEditing,
        canDelete: !busy && hasSaved,
    };
};
