import * as React from "react";
import { ErrorObject } from "ajv";
import {
  Form as FormRadix,
  Switch as SwitchRadix,
  Checkbox as CheckboxRadix,
} from "radix-ui";
import { ChevronDownIcon, CheckIcon, SymbolIcon } from "@radix-ui/react-icons";

import Alert, { AlertProps } from "@/components/ui/Alert";
import Button, { ButtonProps } from "@/components/ui/Button";
import { FieldProps } from "@/utils/forms";

interface FormProps extends FormRadix.FormProps {
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, errors, ...props }, forwardedRef) => {
    
    if (!errors) {
      return (
        <FormRadix.Root {...props} ref={forwardedRef}>
          {children}
        </FormRadix.Root>
      );
    }

    const childrenArray = React.Children.toArray(children);

    const processChildren = (
      children: React.ReactNode[]
    ): React.ReactNode[] => {
      return children.map((child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.props?.field) {
          const fieldErrors = errors?.filter(
            (error) => error.instancePath.slice(1) === child.props?.field?.name
          );

          return React.cloneElement(child as React.ReactElement, {
            ...child.props,
            errors: fieldErrors,
          });
        }

        if (child.props?.children) {
          const processedChildren = processChildren(
            React.Children.toArray(child.props.children)
          );
          return React.cloneElement(child as React.ReactElement, {
            ...child.props,
            children: processedChildren,
          });
        }

        return child;
      });
    };

    return (
      <FormRadix.Root {...props} ref={forwardedRef}>
        {processChildren(childrenArray)}
      </FormRadix.Root>
    );
  }
);

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

interface FormFieldProps extends Partial<FormRadix.FormFieldProps> {
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { labelProps, label, controlProps, children, field, errors, ...props },
    forwardedRef
  ) => {
    const classNameConnect: string[] = ["flex flex-col gap-0.5"];
    const hasError = field?.touch && errors && errors.length > 0;
    const hasSelect = React.Children.toArray(children).some(
      (child: any) => child?.type === "select"
    );

    if (props.className) {
      classNameConnect.push(props.className);
    }

    const name = props.name || field?.name;

    return (
      <FormRadix.Field
        className={classNameConnect.join(" ")}
        name={name}
        {...props}
        serverInvalid={hasError}
        ref={forwardedRef}
      >
        {label && <FormRadix.Label {...labelProps}>{label}</FormRadix.Label>}
        <div className="relative ">
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

interface FormSwitchProps extends Partial<FormRadix.FormFieldProps> {
  id?: string;
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}

export const FormSwitch = React.forwardRef<HTMLDivElement, FormSwitchProps>(
  (
    { labelProps, label, controlProps, field, children, id, errors, ...props },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const idConnect = id ? id : React.useId();
    const name = props.name || field?.name;

    return (
      <FormRadix.Field
        {...props}
        ref={forwardedRef}
        name={name}
        serverInvalid={hasError}
      >
        <div className="flex items-center gap-1">
          {label && (
            <FormRadix.Label htmlFor={idConnect}>{label}</FormRadix.Label>
          )}
          <SwitchRadix.Root
            id={idConnect}
            className="relative h-1.5 w-2.5 cursor-pointer rounded-full outline-none bg-black-4 data-[state=checked]:bg-gray-10"
            {...(field && {
              checked: Boolean(field?.value),
              onCheckedChange: field?.onCheckedChange,
            })}
          >
            <SwitchRadix.Thumb className="block size-1 translate-x-[3.5px] rounded-full bg-gray-1 shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[15.5px]" />
          </SwitchRadix.Root>
        </div>
        <FormRadix.Control
          value="on"
          type="checkbox"
          checked={Boolean(field?.value)}
          onChange={field?.onCheckedChange}
          className="border-0 absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap break-normal clip-rect hidden"
        />
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

interface FormCheckboxProps extends Partial<FormRadix.FormFieldProps> {
  id?: string;
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
}

export const FormCheckbox = React.forwardRef<HTMLDivElement, FormCheckboxProps>(
  (
    { labelProps, label, controlProps, field, children, id, errors, ...props },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const idConnect = id ? id : React.useId();
    const name = props.name || field?.name;
    return (
      <FormRadix.Field
        {...props}
        ref={forwardedRef}
        name={name}
        serverInvalid={hasError}
      >
        <div className="flex items-center gap-1">
          <div>
            <CheckboxRadix.Root
              id={idConnect}
              className="border flex size-1.5 items-center justify-center rounded outline-none"
              {...(field && {
                checked: Boolean(field?.value),
                onCheckedChange: field?.onCheckedChange,
              })}
            >
              <CheckboxRadix.Indicator>
                <CheckIcon />
              </CheckboxRadix.Indicator>
            </CheckboxRadix.Root>
          </div>
          {label && (
            <FormRadix.Label htmlFor={idConnect}>{label}</FormRadix.Label>
          )}
        </div>
        <FormRadix.Control
          value="on"
          type="checkbox"
          checked={Boolean(field?.value)}
          onChange={field?.onCheckedChange}
          className="border-0 absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap break-normal clip-rect hidden"
        />
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

interface FormAlertProps extends AlertProps {
  formData: any;
}

export const FormAlert = ({ children, formData, ...props }: FormAlertProps) => {
  if (formData?.fetchStatus !== "error") {
    return null;
  }
  return <Alert status="danger" {...props} label={formData.error} />;
};
