import { useRef } from "react";
import Icon from "./icon";
import { SharedBasic, HelpType, AuraIcons } from "../types/global";

/**
 * Select component
 */

export interface SelectProps extends SharedBasic {
  isDisabled?: boolean;
  isHelping?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  helpText?: string;
  leftIcon?: AuraIcons;
  placeholder?: string;
  name: string;
}

const Select = ({
  isDisabled,
  isHelping,
  helpMode,
  helpText,
  placeholder,
  className,
  children,
  ...props
}: SelectProps) => {
  const classConnect = [className];

  if (isDisabled) {
    classConnect.push("disabled");
  }

  if (isHelping) {
    classConnect.push("help");
    classConnect.push(helpMode);
  }

  return (
    <div className="inputer">
      <div className="inputer-group">
        <div className="halo">
          <select
            className={classConnect.join(" ").trim()}
            disabled={isDisabled}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
          </select>
          <Icon sprite="arrowDown" className="right action disable not-event" />
        </div>
      </div>
      {isHelping && <span className={`${helpMode}-text`}>{helpText}</span>}
    </div>
  );
};

Select.defaultProps = {
  helpMode: "warning",
};

export default Select;
