import {ReactNode} from "react";

export interface FormContainerProps {
    token: string | null;
    onClose: () => void;
    children: ReactNode;
}