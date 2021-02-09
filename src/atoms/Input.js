import React from "react";
import PropTypes from "prop-types";

import Icon from "./icon";

/**
 * Icon component
 */

const Input = ({
  isDisabled,
  isNaked,
  isWaiting,
  isHelping,
  waitingText,
  helpText,
  HelpTextColor,
  placeholder,
  className,
  label,
  icon,
  name,
  ...props
}) => {
  const classConnect = [className];

  if (icon) {
    classConnect.push("typeahead");
  }

  if (isHelping) {
    classConnect.push(HelpTextColor);
  }

  if (isDisabled) {
    classConnect.push("disable");
  }

  if (isNaked) {
    classConnect.push("naked");
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
              disabled={isDisabled}
              className={classConnect.join(" ").trim()}
              {...props}
            />
            {placeholder && label && (
              <label htmlFor={name}>{placeholder}</label>
            )}
            {icon && <Icon sprite={icon} className="action left disable" />}
          </div>
          {isHelping && (
            <span className="dark-mode">
              <small className={`${HelpTextColor}-text`}>{helpText}</small>
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
  label: PropTypes.bool,
  dialog: PropTypes.bool,
  dialogColor: PropTypes.oneOf(["blue", "green", "yellow", "orange"]),
  dialogMessage: PropTypes.string,
  icon: PropTypes.oneOf([
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
  label: true,
  dialogColor: "yellow",
};

export default Input;
