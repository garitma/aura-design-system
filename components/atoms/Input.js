import React from "react";
import PropTypes from "prop-types";

/**
 * Icon component
 */

const Input = ({ placeholder, name, ...props }) => {
  return (
    <div className="inputer-group">
      <div className="halo">
        <input
          name={name}
          aria-label={placeholder}
          placeholder={placeholder}
          {...props}
        />
        {placeholder && <label for={name}>{placeholder}</label>}
      </div>
    </div>
  );
};

export default Input;
