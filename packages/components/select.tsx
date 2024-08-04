import { SelectHTMLAttributes } from "react";

import { ChevronDownIcon } from "../icons";
import { SharedBasic, HelpType } from "../types/global";
import { SelectValueProps } from "../hooks/use-form";

/**
 * Select component
 */

export interface SelectProps
  extends SharedBasic,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange">,
    Omit<SelectValueProps, "onChange"> {
  isDisabled?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  placeholder?: string;
  name?: string;
  classNameContainer?: string;
}

const Select = ({
  isDisabled,
  isHelping,
  isLabelable,
  helpMode = "warning",
  helpText,
  placeholder,
  className,
  classNameContainer,
  name,
  children,
  ...props
}: SelectProps): JSX.Element => {
  const { touch, setTouch, setValue, reset, dialog, value, ...inputProps } =
    props;

  const classConnect: string[] = [className!];
  const classContainerConnect: string[] = [classNameContainer!, "inputer"];

  if (isDisabled) {
    classConnect.push("disabled");
  }

  if (isHelping) {
    classConnect.push("help");
    classConnect.push(helpMode);
  }

  return (
    <div className={classContainerConnect.join(" ").trim()}>
      <div className="inputer-group">
        <div className="halo">
          <select
            className={classConnect.join(" ").trim()}
            aria-label={placeholder}
            disabled={isDisabled}
            value={value?.toLocaleString()}
            {...inputProps}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
          </select>
          <div className="dropdown disable notevent">
            <ChevronDownIcon
              className="icon"
              role="presentation"
              focusable="false"
            />
          </div>
        </div>
      </div>
      {isHelping && <div className={`${helpMode}-text aura`}>{helpText}</div>}
    </div>
  );
};

export default Select;
