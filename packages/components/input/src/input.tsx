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
}

const Input = ({
  isDisabled,
  isHelping,
  isLabelable,
  helpMode = "warning",
  helpText,
  placeholder,
  className,
  name,
  ...props
}: InputProps) => {
  const classConnect: string[] = [className!];

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
    <div className="inputer">
      <div className={`inputer-group`}>
        <div className="halo">
          <input
            name={name}
            aria-label={placeholder}
            placeholder={placeholder}
            disabled={isDisabled}
            className={classConnect.join(" ").trim()}
            {...props}
          />
          {placeholder && isLabelable && (
            <label htmlFor={name}>{placeholder}</label>
          )}
        </div>
        {isHelping && <span className={`${helpMode}-text`}>{helpText}</span>}
      </div>
    </div>
  );
};

Input.defaultProps = {
  helpMode: "warning",
};

export default Input;
