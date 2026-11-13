import type { ReactNode } from 'react';

export interface AccordionProps {
    title: string;
    children: ReactNode;
    /** Collapsed by default. */
    defaultOpen?: boolean;
    className?: string;
}
