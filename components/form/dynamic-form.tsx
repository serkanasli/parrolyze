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
import { useEffect, useState } from "react";
import { ControllerFieldState, Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUpload from "./image-upload";

interface DynamicFormProps<T extends z.ZodType<any, any>> {
  formId?: string;
  schema: T;
  fields: FormFieldType[];
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  submitButtonText?: string;
  isSubmitButtonShow?: boolean;
  dynamicOptions?: Record<string, ComboBoxItemType[]>;
  defaultValues?: z.infer<T>;
  onStateChange?: (state: {
    isDirty: boolean;
    isLoading: boolean;
    isSubmitSuccessful: boolean;
  }) => void;
}

function DynamicForm<T extends z.ZodType<any, any>>({
  formId,
  schema,
  fields,
  onSubmit,
  submitButtonText = "Save",
  isSubmitButtonShow = true,
  dynamicOptions,
  defaultValues,
  onStateChange,
}: DynamicFormProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as Resolver<z.infer<T>>,
    defaultValues: defaultValues,
  });

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      // form.reset(data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { formState } = form;

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        isDirty: formState.isDirty,
        isSubmitSuccessful: formState.isSubmitSuccessful,
        isLoading,
      });
    }
  }, [formState.isDirty, formState.isSubmitSuccessful, isLoading, onStateChange]);

  const renderField = (item: FormFieldType, field: any, fieldState: ControllerFieldState) => {
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
      case "image-upload":
        return <ImageUpload {...field} {...item?.props} invalid={fieldState.invalid} />;
      case "select":
        const selectOptions =
          item.optionsKey && dynamicOptions ? dynamicOptions[item.optionsKey] : item.options || [];
        return (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={item.defaultValue || field.value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{item.selectLabel}</SelectLabel>
                {selectOptions.map((store) => (
                  <SelectItem key={store.value} value={store.value}>
                    {store.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        const comboboxOptions =
          item.optionsKey && dynamicOptions ? dynamicOptions[item.optionsKey] : item.options || [];

        return (
          <ComboBox
            buttonClassName="w-full"
            options={comboboxOptions}
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
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onReset={() => form.reset()}
        className="flex flex-col gap-y-5"
        id={formId}
      >
        {fields.map((item, index) => {
          // Conditionally render the field based on the value of another field.
          // If `showIf` is defined for this field:
          //   1. Get the target field name (`showIf.field`).
          //   2. Watch the form state to get the current value of that field,
          //      or fall back to its `defaultValue` if not set.
          //   3. Split `showIf.equals` into an array of allowed values.
          //   4. If the target field's value is not in the allowed values,
          //      skip rendering this field by returning `null`.

          if (item?.showIf) {
            const field = item?.showIf.field;
            if (field) {
              const watch = form.watch();
              const defaultValue = fields.find((observed) => observed.name === field)?.defaultValue;
              const fieldValue = watch[field] || defaultValue;
              const allowedValues = item.showIf.equals.split("|");
              if (!allowedValues.includes(fieldValue)) {
                return null;
              }
            }
          }

          return (
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
                  {renderField(item, field, fieldState)}
                </FormFieldItem>
              )}
            />
          );
        })}

        {isSubmitButtonShow && (
          <div className="mt-2.5 ml-auto flex gap-3">
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin" />}
              {submitButtonText}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default DynamicForm;
