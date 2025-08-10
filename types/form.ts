export type ComboBoxItemType = {
  value: string;
  label: string;
  flag?: string;
};

type FieldType = "text" | "textarea" | "combobox";

export type FormFieldType = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  maxLength?: number;
  options?: ComboBoxItemType[];
  optionsKey?: string;
};
