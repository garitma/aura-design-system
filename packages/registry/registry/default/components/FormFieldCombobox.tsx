import * as React from "react";
import { ErrorObject } from "ajv";
import { Form as FormRadix } from "radix-ui";

import { FieldProps } from "@/hooks/use-dynamic-form";
import { ComboboxSingle, ComboboxOption } from "@/components/ComboboxSingle";
import { ComboboxMultiple } from "@/components/ComboboxMultiple";
import { cn } from "@/utils/class-names";

interface FormFieldComboboxProps extends Partial<FormRadix.FormFieldProps> {
  label?: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
  options: ComboboxOption[];
  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiple?: boolean;
  /**
   * Placeholder text for the combobox
   */
  placeholder?: string;
  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;
  /**
   * Custom className for the combobox
   */
  className?: string;
}

export const FormFieldCombobox = React.forwardRef<
  HTMLDivElement,
  FormFieldComboboxProps
>(
  (
    {
      label,
      labelProps,
      controlProps,
      field,
      errors,
      options,
      multiple = false,
      placeholder,
      disabled = false,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const name = props.name || field?.name || "";

    const handleChange = (value) => {
      if (field?.setValue) {
        field.setValue(value);
      }
    };

    return (
      <FormRadix.Field
        {...props}
        ref={forwardedRef}
        name={name}
        serverInvalid={hasError}
        className={cn("flex flex-col gap-0.5", className)}
      >
        {label && <FormRadix.Label {...labelProps}>{label}</FormRadix.Label>}
        <FormRadix.Control {...controlProps} asChild>
          {multiple ? (
            <ComboboxMultiple options={options} onChange={handleChange} />
          ) : (
            <ComboboxSingle options={options} onChange={handleChange} />
          )}
        </FormRadix.Control>
        {hasError &&
          errors?.map((error, index) => (
            <FormRadix.Message className="text-warning-contrast" key={index}>
              {error.message}
            </FormRadix.Message>
          ))}
      </FormRadix.Field>
    );
  }
);

FormFieldCombobox.displayName = "FormFieldCombobox";
