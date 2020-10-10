import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

/**
 * Icon component
 */

const Input = ({ placeholder, dialog, label, icon, name, ...props }) => {
  return (
    <div className="inputer">
      <div className={`inputer-group`}>
        <div className="halo">
          <input
            name={name}
            aria-label={placeholder}
            placeholder={placeholder}
            className={`${icon && "typeahead"}`}
            {...props}
          />
          {placeholder && label && <label htmlFor={name}>{placeholder}</label>}
          {icon && <Icon sprite={icon} typehead />}
        </div>
      </div>
      {dialog &&
        <div className="mod yellow wallpad centertxt">
          {dialog}
        </div>
      }
      
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.bool,
  dialog: PropTypes.string,
  icon: PropTypes.oneOf([
    "arrowDown",
    "arrowLeft",
    "arrowRight",
    "arrowUp",
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
};

export default Input;
