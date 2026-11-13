export interface ManagementSectionProps {
    title: string;
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    items: { id: number; label: string }[];
    /** Clear selection + blank form fields (no API call). */
    onStartCreate: () => void;
    /** Persist current form: create when no selection, update when selected. */
    onSave: () => void | Promise<void>;
    onDelete: () => void | Promise<void>;
    disabled?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    createCtaLabel?: string;
    selectPlaceholder?: string;
    draftHint?: string;
    newLabel?: string;
    saveLabel?: string;
    editLabel?: string;
    deleteLabel?: string;
    /** True while creating or editing; form fields should unlock when true. */
    isEditing: boolean;
    onEditingChange: (editing: boolean) => void;
    /** Dirty + required fields filled — Save stays disabled until true while editing. */
    canCommit?: boolean;
    /** Unsaved edits while editing — show dirty marker on Save. */
    isDirty?: boolean;
}
