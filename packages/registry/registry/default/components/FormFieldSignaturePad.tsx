import * as React from "react";
import { ErrorObject } from "ajv";
import { Form as FormRadix } from "radix-ui";
import type { ComponentRef } from "react";

import { FieldProps } from "@/hooks/use-dynamic-form";
import SignaturePad, {
  SignaturePadProps,
} from "@/components/ui/SignaturePad";

interface FormFieldSignaturePadProps
  extends Partial<FormRadix.FormFieldProps>,
    Omit<SignaturePadProps, "onChange" | "onSave"> {
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
  /**
   * Callback function to be called when the signature is saved
   * This is in addition to the form field value being updated
   */
  onSave?: (signature: Base64URLString) => void;
}

export const FormFieldSignaturePad = React.forwardRef<
  HTMLDivElement,
  FormFieldSignaturePadProps
>(
  (
    {
      label,
      labelProps,
      controlProps,
      field,
      errors,
      onSave,
      penColor,
      lineWidth,
      showButtons,
      saveButtonIcon,
      clearButtonIcon,
      variant,
      size,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const name = props.name || field?.name || "";
    const signaturePadRef = React.useRef<ComponentRef<typeof SignaturePad>>(null);

    // Clear signature pad when form field value is cleared externally
    React.useEffect(() => {
      if (!field?.value && signaturePadRef.current) {
        signaturePadRef.current.clear();
      }
    }, [field?.value]);

    // Handle signature changes - update form field value
    const handleChange = React.useCallback(
      (signature: Base64URLString | null) => {
        if (field?.setValue) {
          field.setValue(signature || "");
        }
      },
      [field]
    );

    // Handle signature save - update form field and call optional onSave callback
    const handleSave = React.useCallback(
      (signature: Base64URLString) => {
        if (field?.setValue) {
          field.setValue(signature);
        }
        onSave?.(signature);
      },
      [field, onSave]
    );

    return (
      <FormRadix.Field
        {...props}
        ref={forwardedRef}
        name={name}
        serverInvalid={hasError}
        className={className}
      >
        {label && <FormRadix.Label {...labelProps}>{label}</FormRadix.Label>}
        <FormRadix.Control {...controlProps} asChild>
          <SignaturePad
            ref={signaturePadRef}
            onChange={handleChange}
            onSave={handleSave}
            penColor={penColor}
            lineWidth={lineWidth}
            showButtons={showButtons}
            saveButtonIcon={saveButtonIcon}
            clearButtonIcon={clearButtonIcon}
            variant={variant}
            size={size}
          />
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

FormFieldSignaturePad.displayName = "FormFieldSignaturePad";

