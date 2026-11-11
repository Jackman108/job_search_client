export interface ManagementSectionProps {
    title: string;
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    items: { id: number; label: string }[];
    /** Clear selection + blank form fields (no API call). */
    onStartCreate: () => void;
    /** Persist current form: create when no selection, update when selected. */
    onSave: () => void | Promise<void>;
    onDelete: () => void;
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
}
