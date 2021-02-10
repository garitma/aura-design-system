import React from "react";
import PropTypes from "prop-types";

/**
 * Input component
 */

const Input = ({
  isDisabled,
  isHelping,
  isLabelable,
  helpText,
  leftIcon,
  placeholder,
  className,
  name,
  ...props
}) => {
  const classConnect = [className];

  if (leftIcon) {
    classConnect.push("typeahead");
  }

  if (isDisabled) {
    classConnect.push("disable");
  }

  return (
    <div className="inputer">
      <div className={`inputer-group`}>
        <div className="input-group">
          <div className="halo">
            <input
              name={name}
              aria-label={placeholder}
              placeholder={placeholder}
              disabled={isDisabled || isWaiting}
              className={classConnect.join(" ").trim()}
              {...props}
            />
            {placeholder && isLabelable && (
              <label htmlFor={name}>{placeholder}</label>
            )}
            {leftIcon && leftIcon}
          </div>
          {isHelping && (
            <span className="dark-mode">
              <small>{helpText}</small>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHelping: PropTypes.bool,
  isLabelable: PropTypes.bool,
  helpText: PropTypes.string,
};

Input.defaultProps = {
  isLabelable: true,
};

export default Input;
