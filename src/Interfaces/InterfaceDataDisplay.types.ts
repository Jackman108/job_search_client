
export interface FieldConfig {
  [key: string]: string;
}

export interface ConfigItem {
    title: string;
    apiEndpoint: () => string;
    fields: FieldConfig;
}

export interface DataDisplayProps {
    config: Record<string, ConfigItem>
}

export interface DataItem {
  id: number; 
  [key: string]: any; 
}

export interface RenderFormArrayProps {
  config: ConfigItem;
}