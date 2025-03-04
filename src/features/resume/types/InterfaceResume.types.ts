import {ChangeEvent, FormEvent} from "react";

export interface FieldConfig {
    [key: string]: string;
}

export interface ConfigItem {
    title: string;
    apiEndpoint: string;
    fields: FieldConfig;
}

export interface ResumeConfigProps {
    config: Record<string, ConfigItem>
}

export interface ResumeArrayProps {
    config: Record<string, any>;
    type: string;
}

export interface ResumeFieldProps {
    fieldKey: string;
    label: string;
    value: any;
    onChange: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
    formData: Record<string, any>;
    fieldType: 'text' | 'checkbox' | 'radio';
    options?: string[];
}

export interface ResumeViewProps {
    type: string;
    fields: Record<string, string>;
    data: Record<string, any>;
    config: Record<string, any>;
    onEditClick: (type: string, data: any) => void;
    onDeleteClick: (type: string) => void;
    onCreateClick: (type: string) => void;
}

export interface ResumeChangeProps {
    type: string;
    fields: Record<string, string>;
    formData: Record<string, any>;
    onCancel: () => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>, type: string) => Promise<void>;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
}

export interface FetchByTypeConfig {
    config: ConfigItem | Record<string, ConfigItem>;
    type?: string;
}

export interface FetchDataResponse {
    [key: string]: any;
}

export interface DeleteItemMutationParams {
    type: string;
    id?: number | string;
}

export interface SaveItemMutationParams {
    type: string;
    id?: number | string;
    formData: any;
    isEditing: boolean;
}