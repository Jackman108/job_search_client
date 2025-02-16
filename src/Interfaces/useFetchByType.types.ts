import {ConfigItem} from "./InterfaceResume.types";

export interface FetchByTypeConfig {
    config: ConfigItem | Record<string, ConfigItem>;
    type?: string;
}

export interface FetchDataResponse {
    [key: string]: any;
}

export interface DeleteItemMutationParams {
    type: string;
    id?: number;
}

export interface SaveItemMutationParams {
    type: string;
    id: number;
    formData: any;
    isEditing: boolean;
}
