import { ReactNode } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

type FormFieldItemProps = {
  label: string;
  labelRightComponent?: ReactNode;
  required?: boolean;
  children: ReactNode;
};

export default function FormFieldItem({
  label,
  required = false,
  labelRightComponent,
  children,
}: FormFieldItemProps) {
  return (
    <FormItem>
      <div className="flex items-center justify-between">
        {label && <FormLabel>{label}</FormLabel>}
        <div className="flex items-center space-x-2">
          {required && <span className="text-muted-foreground text-xs">Required</span>}
          {labelRightComponent && <>{labelRightComponent}</>}
        </div>
      </div>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}
