import { ButtonHTMLAttributes, ChangeEvent, FC } from 'react';
import type { HhJobKind } from './HhJob.types';

export interface ButtonConfig<T> {
    icon: string;
    tooltipText: string;
    Component: FC<T>;
    position: 'left' | 'right';
    /** When true, button is hidden for guests (login chrome stays visible). */
    requiresAuth?: boolean;
    /** When set, sidebar shows a spinner while this HH job kind is active. */
    jobKind?: HhJobKind;
}

export interface InteractiveButtonProps {
    icon: string;
    tooltipText: string;
    Component: FC<{ onClose: () => void; isOpen: boolean }>;
    position?: 'left' | 'right';
    jobKind?: HhJobKind;
    isJobBusy?: boolean;
}

export interface PanelProps {
    onClose: () => void;
    isOpen: boolean;
}

export interface CaptchaAlertProps {
    message: string;
    captchaSrc?: string;
    onClose: () => void;
}

export interface StateAlertProps {
    message: string | null;
    captchaSrc: string | undefined;
}

export interface AvatarProps {
    src?: string;
    alt?: string;
    className?: string;
}

export interface ImagePreviewProps {
    src: string;
    alt?: string;
}

export interface ImageUploaderProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'close';
    isLoading?: boolean;
}
