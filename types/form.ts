export type FormType = "edit" | "create";

export type ComboBoxItemType = {
  value: string;
  label: string;
  flag?: string;
};

type FieldType = "text" | "textarea" | "combobox" | "select" | "image-upload";

export type FormFieldType = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  options?: ComboBoxItemType[];
  optionsKey?: string;
  selectLabel?: string;
  showIf?: {
    field: string;
    equals: string;
  };
  props?: object;
};
