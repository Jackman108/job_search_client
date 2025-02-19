export interface ManagementSectionProps {
    title: string;
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    items: { id: number | undefined; label: string }[];
    onCreate: () => void;
    onUpdate: () => void;
    onDelete: () => void;
    disabled?: boolean;
}