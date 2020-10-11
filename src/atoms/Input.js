import React from "react";
import PropTypes from "prop-types";

import { Icon } from "..";

/**
 * Icon component
 */

const Input = ({
  placeholder,
  className,
  dialog,
  dialogColor,
  label,
  icon,
  name,
  ...props
}) => {
  const inputAllClassName = `${className || ""} ${icon ? "typeahead" : ""} ${
    dialog ? dialogColor : ""
  }`;

  return (
    <div className="inputer">
      <div className={`inputer-group`}>
        <div className="halo">
          <input
            name={name}
            aria-label={placeholder}
            placeholder={placeholder}
            className={inputAllClassName}
            {...props}
          />
          {placeholder && label && <label htmlFor={name}>{placeholder}</label>}
          {dialog && <span className="disable">{dialog}</span>}
          {icon && <Icon sprite={icon} className="action left disable" />}
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.bool,
  dialog: PropTypes.string,
  dialogColor: PropTypes.oneOf(["blue", "green", "yellow", "orange", "pink"]),
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
