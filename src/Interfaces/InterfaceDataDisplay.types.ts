
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

export interface DataItem {
  id: number; 
  [key: string]: any; 
}

export interface RenderArrayProps {
  config: ConfigItem;
  userId: string;
  data: any[];
}