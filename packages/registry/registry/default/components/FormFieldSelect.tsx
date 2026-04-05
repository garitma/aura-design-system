import * as React from "react";
import { ErrorObject } from "ajv";
import { Form as FormRadix } from "radix-ui";

import { FieldProps } from "@/hooks/use-dynamic-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "@/components/ui/Select";
import { cn } from "@/utils/class-names";

export interface SelectOption {
  label: string;
  value: string;
}

interface FormFieldSelectProps extends Partial<FormRadix.FormFieldProps> {
  label?: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
  options: SelectOption[];
  /**
   * Placeholder text for the select
   */
  placeholder?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Default value for the select
   */
  defaultValue?: string;
  /**
   * Controlled value for the select
   */
  value?: string;
  /**
   * Custom className for the select
   */
  className?: string;
}

export const FormFieldSelect = React.forwardRef<
  HTMLDivElement,
  FormFieldSelectProps
>(
  (
    {
      label,
      labelProps,
      controlProps,
      field,
      errors,
      options,
      placeholder,
      disabled = false,
      defaultValue,
      value,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const name = props.name || field?.name || "";

    const handleValueChange = (newValue: string) => {
      if (field?.setValue) {
        field.setValue(newValue);
      }
    };

    return (
      <FormRadix.Field
        {...props}
        ref={forwardedRef}
        name={name}
        serverInvalid={hasError}
        className={cn(className)}
      >
        {label && (
          <div className="mb-1">
            <FormRadix.Label {...labelProps}>{label}</FormRadix.Label>
          </div>
        )}
        <FormRadix.Control {...controlProps} asChild>
          <Select
            defaultValue={defaultValue}
            onValueChange={handleValueChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectViewport>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <SelectItemText>{option.label}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
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

FormFieldSelect.displayName = "FormFieldSelect";

