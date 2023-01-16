import { ChevronDownIcon } from "../icons";
import { SharedBasic, HelpType } from "../types/global";

/**
 * Select component
 */

export interface SelectProps extends SharedBasic {
  isDisabled?: boolean;
  isHelping?: boolean;
  isLabelable?: boolean;
  helpMode?: HelpType;
  helpText?: string;
  placeholder?: string;
  name?: string;
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
            aria-label={placeholder}
            disabled={isDisabled}
            {...props}
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
      {isHelping && (
        <div className={`${helpMode}-text wall-pad aura`}>{helpText}</div>
      )}
    </div>
  );
};

Select.defaultProps = {
  helpMode: "warning",
};

export default Select;
