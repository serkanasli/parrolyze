import { FormField } from "@/types/form";

export const editProjectIconFormFields: FormField[] = [
  {
    name: "icon_file",
    label: "Project Icon",
    type: "image-upload",
    props: {
      hideDeleteButton: true,
    },
  },
];
