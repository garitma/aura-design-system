import { InputHTMLAttributes } from "react";

import type { SharedBasic, HelpType } from "../types/global";
import { InputValueProps, InitialInputValueProps } from "../hooks/use-form";

/**
 * Input component
 */

export interface InputProps
  extends SharedBasic,
    Omit<InputHTMLAttributes<HTMLInputElement>, "value">,
    Omit<InputValueProps, "onChange"> {
  isDisabled?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  placeholder?: string;
  name?: string;
  classNameContainer?: string;
}

const Input = ({
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
  const { touch, setTouch, setValue, reset, dialog, value, ...inputProps } =
    props;

  const classConnect: string[] = [className!];
  const classContainerConnect: string[] = [classNameContainer!, "inputer"];

  const validateValue = (value: any) => {
    if (!["number", "string"].includes(typeof value)) {
      return ;
    }

    return value;
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
          <input
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

export default Input;
