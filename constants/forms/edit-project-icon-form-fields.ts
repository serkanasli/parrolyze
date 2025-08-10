import { FormFieldType } from "@/types/form";

export const editProjectIconFormFields: FormFieldType[] = [
  {
    name: "icon_file",
    label: "Project Icon",
    type: "image-upload",
    props: {
      hideDeleteButton: true,
    },
  },
];
