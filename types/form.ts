// Union literal → type
export type FormAction = "edit" | "create";
type Field = "text" | "textarea" | "combobox" | "select" | "image-upload";

// Obje tipi → interface
export interface ComboBoxItem {
  value: string;
  label: string;
  flag?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: Field;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  options?: ComboBoxItem[];
  optionsKey?: string;
  selectLabel?: string;
  showIf?: {
    field: string;
    equals: string;
  };
  props?: object;
}
