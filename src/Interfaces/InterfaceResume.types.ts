
export interface FieldConfig {
  [key: string]: string;
}

export interface ConfigItem {
  title: string;
  apiEndpoint: () => string;
  fields: FieldConfig;
}

export interface ResumeConfigProps {
  config: Record<string, ConfigItem>
}

export interface ResumeArrayProps {
  config: ConfigItem;
}

export interface ResumeProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface ResumeFieldProps {
  fieldKey: string;
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
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
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, type: string) => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
}