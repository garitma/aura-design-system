import { InputHTMLAttributes } from "react";

import { SharedBasic, HelpType } from "../types/global";

/**
 * Input component
 */

export interface InputProps
  extends SharedBasic,
    InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  isHelping?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  helpText?: string;
  placeholder?: string;
  name?: string;
  classNameContainer?: string;
  dialog?: string;
  touch?: boolean;
  setTouch?: (event?: any) => void;
  setValue?: (event?: any) => void;
  reset?: (event?: any) => void;
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
  
  const { touch, setTouch, setValue, reset, dialog, ...inputProps } = props;

  const classConnect: string[] = [className!];
  const classContainerConnect: string[] = [classNameContainer!, "inputer"];

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

Input.defaultProps = {
  helpMode: "warning",
};

export default Input;
