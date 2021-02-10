import React from "react";
import PropTypes from "prop-types";
import Icon from "../atoms/icon";

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
    classConnect.push("disabled");
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
        </div>
        {isHelping && (
          <span className="dark-mode">
            <small>{helpText}</small>
          </span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  isDisabled: PropTypes.bool,
  isLabelable: PropTypes.bool,
  isHelping: PropTypes.bool,
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  leftIcon: PropTypes.oneOf([
    "bag",
    "bag-add",
    "box",
    "close",
    "facebook",
    "giphy",
    "heart",
    "heart-fill",
    "heart-fill-black",
    "instagram",
    "key",
    "link",
    "location",
    "mail",
    "menu",
    "pay",
    "search",
    "store",
    "twitter",
    "user",
    "youtube",
  ]),
};

Input.defaultProps = {
  isLabelable: true,
};

export default Input;
