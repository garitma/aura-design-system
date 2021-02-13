import React, { useState } from "react";
import PropTypes from "prop-types";

import Icon from "./icon";

/**
 * Select component
 */

const Select = ({
  isDisabled,
  isHelping,
  helpMode,
  helpText,
  placeholder,
  className,
  children,
  ...props
}) => {
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
          <Icon sprite="arrowDown" className="right action disable" />
        </div>
      </div>
      {isHelping && (
        <span className={`${helpMode}-text`}>
          <small>{helpText}</small>
        </span>
      )}
    </div>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHelping: PropTypes.bool,
  helpText: PropTypes.string,
  helpMode: PropTypes.oneOf(["warning", "info", "danger", "success"])
};

Select.defaultProps = {
  helpMode: "warning"
};

export default Select;
