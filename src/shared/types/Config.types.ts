export interface FieldConfig {
    [key: string]: string;
}

export interface ConfigItem {
    title: string;
    apiEndpoint: string;
    fields: FieldConfig;
}

export interface QueryConfigProps {
    config: Record<string, ConfigItem>
}