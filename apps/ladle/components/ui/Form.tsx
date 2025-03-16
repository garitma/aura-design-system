import * as React from "react";
import { Form as FormRadix } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface FormFieldProps extends FormRadix.FormFieldProps {
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: any;
  messages?: FormRadix.FormMessageProps[];
}

export const Form = FormRadix.Root;
export const FormSubmit = FormRadix.Submit;

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { labelProps, label, controlProps, messages, children, field, ...props },
    forwardedRef
  ) => {
    const classNameConnect: string[] = ["grid gap-0.5"];

    const hasSelect = React.Children.toArray(children).some(
      (child) => child?.type === "select"
    );

    if (props.className) {
      classNameConnect.push(props.className);
    }

    return (
      <FormRadix.Field
        className={classNameConnect.join(" ")}
        {...props}
        ref={forwardedRef}
      >
        {label && <FormRadix.Label {...labelProps}>{label}</FormRadix.Label>}
        <div className="relative">
          <FormRadix.Control
            {...controlProps}
            onChange={field?.onChange}
            asChild={Boolean(children)}
          >
            {children}
          </FormRadix.Control>
          {hasSelect && (
            <div className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none">
              <ChevronDownIcon className="icon" />
            </div>
          )}
        </div>
        {messages &&
          messages.length > 0 &&
          messages.map((messageProps, index) => (
            <FormRadix.Message {...messageProps} key={index} />
          ))}
      </FormRadix.Field>
    );
  }
);
