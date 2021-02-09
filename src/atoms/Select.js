import React, { useState } from "react";
import PropTypes from "prop-types";

import Icon from "./icon";

/**
 * Select component
 */

const Select = ({
  options,
  placeholder,
  disabled,
  dialog,
  dialogMessage,
  dialogColor,
  name,
  label,
  className,
  ...props
}) => {
  const [labelInit, setLabelInit] = useState(false);

  const classConnect = [className];
  if (dialog) {
    classConnect.push(dialogColor);
  }
  if (disabled) {
    classConnect.push("disable");
  }

  return (
    <div className="inputer">
      <div className="inputer-group select-group">
        <div className="halo">
          <select
            name={name}
            className={classConnect.join(" ").trim()}
            onClick={() => setLabelInit(true)}
            disabled={disabled}
            {...props}
          >
            {placeholder && !labelInit ? (
              <option defaultValue>{placeholder}</option>
            ) : (
              <option disabled>{placeholder}</option>
            )}
            {options.map((option, index) => (
              <option value={option[0]} key={index}>
                {option[1]}
              </option>
            ))}
          </select>
          <Icon sprite="arrowDown" className="right action disable" />
        </div>
        {placeholder && label && labelInit && (
          <label htmlFor={name}>{placeholder}</label>
        )}
        {dialog && (
          <span className="dark-mode">
            <small className={`${dialogColor}-text`}>{dialogMessage}</small>
          </span>
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.bool,
  dialog: PropTypes.bool,
  dialogMessage: PropTypes.string,
};

Select.defaultProps = {
  options: [],
  dialogColor: "yellow",
  label: true,
};

export default Select;
