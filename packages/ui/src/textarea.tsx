import {TextareaHTMLAttributes } from "react";

import type { SharedBasic, HelpType } from "@aura-design/shate-types/global";
import { InputValueProps, InitialInputValueProps } from "@aura-design/hooks/form";

/**
 * Input component
 */

export interface InputProps
  extends SharedBasic,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value">,
    Omit<InputValueProps, "onChange"> {
  onChange: any,
  isDisabled?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  placeholder?: string;
  name?: string;
  classNameContainer?: string;
}

const Textarea = ({
  isDisabled,
  isHelping,
  isLabelable,
  helpMode = "warning",
  helpText,
  placeholder,
  className,
  classNameContainer,
  name,
  ...props
}: InputProps): JSX.Element => {
  // Extracting specific props from `props` object using destructuring
  const { touch, setTouch, setValue, reset, dialog, value, ...inputProps } =
    props;

  // CSS class names for the input element and container
  const classConnect: string[] = [className!];
  const classContainerConnect: string[] = [classNameContainer!, "inputer"];

  // Function to validate and normalize the value
  const validateValue = (
    value: InitialInputValueProps
  ): string | number | readonly string[] | undefined => {
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    return;
  };

  if (isDisabled) {
    classConnect.push("disabled");
  }

  if (isHelping) {
    classConnect.push("help");
    classConnect.push(helpMode);
  }

  if (!isLabelable) {
    classConnect.push("naked");
  }

  return (
    <div className={classContainerConnect.join(" ").trim()}>
      <div className={`inputer-group`}>
        <div className="halo">
          <textarea
            name={name}
            aria-label={placeholder}
            placeholder={placeholder}
            disabled={isDisabled}
            className={classConnect.join(" ").trim()}
            value={validateValue(value)}
            {...inputProps}
          />
          {placeholder && isLabelable && (
            <label htmlFor={name}>{placeholder}</label>
          )}
        </div>
        {isHelping && <div className={`${helpMode}-text aura`}>{helpText}</div>}
      </div>
    </div>
  );
};

export default Textarea;
