import {ButtonHTMLAttributes, ChangeEvent, FC} from "react";

export interface ButtonConfig<T> {
    icon: string;
    tooltipText: string;
    Component: FC<T>;
    position: 'left' | 'right';
}

export interface InteractiveButtonProps {
    icon: string;
    tooltipText: string;
    Component: FC<{ onClose: () => void; isOpen: boolean }>;
    position?: 'left' | 'right';
}

export interface FormProps {
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

