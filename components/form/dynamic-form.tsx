/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ComboBox } from "@/components/combobox";
import FormFieldItem from "@/components/form/form-field-item";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ComboBoxItemType, FormFieldType } from "@/types/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";

interface DynamicFormProps<T extends z.ZodType<any, any>> {
  schema: T;
  fields: FormFieldType[];
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  submitButtonText?: string;
  dynamicOptions?: Record<string, ComboBoxItemType[]>;
}

function DynamicForm<T extends z.ZodType<any, any>>({
  schema,
  fields,
  onSubmit,
  submitButtonText = "Save",
  dynamicOptions,
}: DynamicFormProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as Resolver<z.infer<T>>,
  });

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (item: FormFieldType, field: any) => {
    switch (item.type) {
      case "text":
        return (
          <Input
            {...field}
            placeholder={item.placeholder}
            maxLength={item.maxLength}
            value={field.value ?? ""}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...field}
            value={field.value ?? ""}
            placeholder={item.placeholder}
            className="h-24"
            maxLength={item.maxLength}
          />
        );
      case "combobox":
        const options =
          item.optionsKey && dynamicOptions ? dynamicOptions[item.optionsKey] : item.options || [];

        return (
          <ComboBox
            buttonClassName="w-full"
            options={options}
            placeholder={item.placeholder}
            defaultValue={field.value ?? ""}
            onValueChange={(val) => field.onChange(val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-y-5">
        {fields.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={item.name as any}
            render={({ field, fieldState }) => (
              <FormFieldItem
                label={item.label}
                labelRightComponent={
                  item.maxLength && (
                    <span
                      className={cn(
                        "text-muted-foreground mr-2.5 text-xs",
                        fieldState?.error && "text-destructive",
                      )}
                    >
                      {field.value?.length || 0}/{item.maxLength}
                    </span>
                  )
                }
              >
                {renderField(item, field)}
              </FormFieldItem>
            )}
          />
        ))}

        <div className="mt-2.5 ml-auto flex gap-3">
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="animate-spin" />}
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DynamicForm;
