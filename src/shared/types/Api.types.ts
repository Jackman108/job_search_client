import {ConfigItem} from "@type";

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