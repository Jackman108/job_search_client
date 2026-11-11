export interface ProfileEmptyStateProps {
    title: string;
    description: string;
    ctaLabel?: string;
    onCreate: () => void;
    disabled?: boolean;
}
