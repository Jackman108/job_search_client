export interface ManagementSectionProps {
    title: string;
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    items: { id: number; label: string }[];
    /** Clear selection + blank form fields (no API call). */
    onStartCreate: () => void;
    /** Persist a new profile from the current form (POST). */
    onCreate: () => void;
    onUpdate: () => void;
    onDelete: () => void;
    disabled?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    createCtaLabel?: string;
}
