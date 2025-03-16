import * as React from "react";
import {
  Form as FormRadix,
  Switch as SwitchRadix,
  Checkbox as CheckboxRadix,
} from "radix-ui";
import { ChevronDownIcon, CheckIcon, SymbolIcon } from "@radix-ui/react-icons";
import Button, { ButtonProps } from "./Button";

interface FormFieldProps extends FormRadix.FormFieldProps {
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: any;
  messages?: FormRadix.FormMessageProps[];
}

export const Form = FormRadix.Root;

interface FormSubmitProps extends FormRadix.FormSubmitProps {
  buttonProps?: ButtonProps;
  fetchStatus?: "idle" | "loading" | "success" | "error";
}

export const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ buttonProps, fetchStatus, ...props }, forwardedRef) => {
    return (
      <FormRadix.Submit {...props} ref={forwardedRef} asChild>
        <Button
          {...buttonProps}
          isLoading={fetchStatus === "loading"}
          isLoadingText={
            <>
              <SymbolIcon className="icon animate-spin" />
            </>
          }
          className="min-w-10"
        />
      </FormRadix.Submit>
    );
  }
);

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

interface FormSwitchProps extends FormRadix.FormFieldProps {
  id?: string;
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: any;
}

export const FormSwitch = React.forwardRef<HTMLDivElement, FormSwitchProps>(
  (
    { labelProps, label, controlProps, field, children, id, ...props },
    forwardedRef
  ) => {
    const idConnect = id ? id : React.useId();

    return (
      <FormRadix.Field {...props} ref={forwardedRef}>
        <div className="flex items-center gap-1">
          {label && (
            <FormRadix.Label htmlFor={idConnect}>{label}</FormRadix.Label>
          )}
          <SwitchRadix.Root
            id={idConnect}
            checked={field?.value}
            onCheckedChange={field?.onCheckedChange}
            className="relative h-1.5 w-2.5 cursor-pointer rounded-full outline-none bg-black-4 data-[state=checked]:bg-black-10"
          >
            <SwitchRadix.Thumb className="block size-1 translate-x-[3.5px] rounded-full bg-black-1 shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[15.5px]" />
          </SwitchRadix.Root>
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

interface FormCheckboxProps extends FormRadix.FormFieldProps {
  id?: string;
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: any;
}

export const FormCheckbox = React.forwardRef<HTMLDivElement, FormCheckboxProps>(
  (
    { labelProps, label, controlProps, field, children, id, ...props },
    forwardedRef
  ) => {
    const idConnect = id ? id : React.useId();

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
