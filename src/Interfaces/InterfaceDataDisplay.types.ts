
export interface FieldConfig {
  [key: string]: string;
}

export interface ConfigItem {
    title: string;
    apiEndpoint: (userId: string) => string;
    fields: FieldConfig;
}

export interface DataDisplayProps {
    config: Record<string, ConfigItem>
}
