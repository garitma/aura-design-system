import React, { useId, useState } from "react";
import { Checkbox as CheckboxRadix, Form as FormRadix } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

interface FormFieldProps extends FormRadix.FormFieldProps {
  id?: string;
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: any;
}

export const FormCheckbox = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { labelProps, label, controlProps, field, children, id, ...props },
    forwardedRef
  ) => {
    const idConnect = id ? id : useId();

    return (
      <FormRadix.Field {...props} ref={forwardedRef}>
        <div className="flex items-center gap-1">
          <CheckboxRadix.Root
            id={idConnect}
            className="border flex size-1.5 items-center justify-center rounded outline-none"
            checked={field?.value}
            onCheckedChange={field?.onCheckedChange}
          >
            <CheckboxRadix.Indicator>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
          {label && (
            <FormRadix.Label htmlFor={idConnect}>{label}</FormRadix.Label>
          )}
        </div>
        <FormRadix.Control
          value="on"
          type="checkbox"
          checked={field?.value}
          onChange={field?.onCheckedChange}
          className="border-0 absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap break-normal clip-rect hidden"
        />
      </FormRadix.Field>
    );
  }
);

const Checkbox = ({ label, id }) => {
  const idConnect = id ? id : useId();

  return (
    <div className="flex items-center">
      <CheckboxRadix.Root
        id={idConnect}
        className="border flex size-2 items-center justify-center rounded outline-none"
      >
        <CheckboxRadix.Indicator>
          <CheckIcon className="icon" />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>

      {label && (
        <label className="pl-1 leading-none" id={idConnect}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
