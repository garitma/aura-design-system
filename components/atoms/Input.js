import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

/**
 * Icon component
 */

const Input = ({ placeholder, icon, name, ...props }) => {
  return (
    <div className={`inputer-group`}>
      <div className="halo">
        <input
          name={name}
          aria-label={placeholder}
          placeholder={placeholder}
          className={`${icon && "typeahead"}`}
          {...props}
        />
        {placeholder && <label htmlFor={name}>{placeholder}</label>}
        {icon && <Icon sprite={icon} typehead />}
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
};

export default Input;
