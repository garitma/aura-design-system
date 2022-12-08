import {InputHTMLAttributes} from "react";

import Icon from "./icon";
import { SharedBasic, HelpType, AuraIcons } from "../types/global";

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
  name?: string;
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

  const handleOnClickRightIcon = (event: any) => {
    event.preventDefault();
    if(onClickRightIcon){
      onClickRightIcon()
    }
  }

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
          {rightIcon && onClickRightIcon && (
            <button className="button-link pin right" onClick={(event) => handleOnClickRightIcon(event)} type="button">
              <Icon sprite={rightIcon} />
            </button>
          )} 
        </div>
        {isHelping && <span className={`${helpMode}-text`}>{helpText}</span>}
      </div>
    </div>
  );
};



export default Input;
