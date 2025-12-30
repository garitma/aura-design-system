import * as React from "react";
import { ErrorObject } from "ajv";
import { Form as FormRadix } from "radix-ui";

import { FieldProps } from "@/hooks/use-dynamic-form";
import { Editor } from "@/blocks/editor-00/editor";
import { cn } from "@/utils/class-names";

interface FormFieldEditorProps extends Partial<FormRadix.FormFieldProps> {
  label?: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
  /**
   * Custom className for the editor field
   */
  className?: string;
}

export const FormFieldEditor = React.forwardRef<
  HTMLDivElement,
  FormFieldEditorProps
>(
  (
    {
      label,
      labelProps,
      controlProps,
      field,
      errors,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const name = props.name || field?.name || "";
    const fieldValue = field?.value ? String(field.value) : "";

    const handleChange = React.useCallback(
      (editorState: string) => {
        if (field?.setValue) {
          field.setValue(editorState);
        }
      },
      [field]
    );

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
          <Editor editorState={fieldValue} onChange={handleChange} />
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

FormFieldEditor.displayName = "FormFieldEditor";

