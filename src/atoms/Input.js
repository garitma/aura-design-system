import React from "react";
import PropTypes from "prop-types";

import { Icon } from "..";

/**
 * Icon component
 */

const Input = ({
  placeholder,
  className,
  disabled,
  dialog,
  dialogColor,
  dialogMessage,
  label,
  icon,
  name,
  ...props
}) => {
  const classConnect = [className];

  if (dialog) {
    classConnect.push(dialogColor);
  }
  if (disabled) {
    classConnect.push("disable");
  }
  if (icon) {
    classConnect.push("typeahead");
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
              disabled={disabled}
              className={classConnect.join(" ").trim()}
              {...props}
            />
            {placeholder && label && (
              <label htmlFor={name}>{placeholder}</label>
            )}
            {icon && <Icon sprite={icon} className="action left disable" />}
          </div>
          {dialog && (
            <span className="dark-mode">
              <small className={`${dialogColor}-text`}>{dialogMessage}</small>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
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
    "youtube"
  ])
};

Input.defaultProps = {
  label: true,
  dialogColor: "yellow"
};

export default Input;
