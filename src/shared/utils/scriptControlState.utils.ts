export type ScriptControlStateArgs = {
    /** HH job running / starting (SearchFormContext isLoading). */
    isLoading: boolean;
    /** Profile chrome in edit mode (New / Edit pressed, not yet saved). */
    isEditing: boolean;
    /** Required fields for this form are filled. */
    canCommit: boolean;
};

export type ScriptControlState = {
    canStart: boolean;
    canStop: boolean;
};

/**
 * Start / Stop matrix for the HH script (Search + Feedback panels).
 * Start: idle AND not editing a profile AND required fields valid.
 * Stop: only while a job is active (independent of editing — you must be able to abort).
 */
export const getScriptControlState = ({
    isLoading,
    isEditing,
    canCommit,
}: ScriptControlStateArgs): ScriptControlState => ({
    canStart: !isLoading && !isEditing && canCommit,
    canStop: isLoading,
});
