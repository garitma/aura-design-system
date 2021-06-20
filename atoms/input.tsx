import {InputHTMLAttributes} from "react";

import Icon from "./icon";
import { SharedBasic, HelpType, AuraIcons } from "../utils/types";

/**
 * Input component
 */

export interface InputProps extends SharedBasic, InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  isHelping?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  helpText?: string;
  leftIcon?: AuraIcons;
  rightIcon?: AuraIcons;
  onClickRightIcon?: () => void;
  placeholder?: string;
  name: string;
}

const Input = ({
  isDisabled,
  isHelping,
  isLabelable,
  helpMode = "warning",
  helpText,
  leftIcon,
  rightIcon,
  onClickRightIcon,
  placeholder,
  className,
  name,
  ...props
}: InputProps) => {
  const classConnect: string[] = [className!];

  if (leftIcon) {
    classConnect.push("typeahead");
  }

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
          {leftIcon && (
            <Icon sprite={leftIcon} className="action left disabled" />
          )}
          {rightIcon && onClickRightIcon ? (
            <button className="button-link pin right" onClick={onClickRightIcon}>
              <Icon sprite={rightIcon} />
            </button>
          ) : (
              <Icon sprite={rightIcon} className="action right disabled wall-pad" />
          )}
        </div>
        {isHelping && <span className={`${helpMode}-text`}>{helpText}</span>}
      </div>
    </div>
  );
};



export default Input;
