import React from "react";
import PropTypes from "prop-types";

/**
 * Primary UI component for user interaction
 */

const Button = ({ label, type, mode, fluid, ...props }) => {
  const size = fluid ? "fluid" : "";

  if (type === "link") {
    return (
      <a className={`button-${mode} ${size}`} {...props}>
        <span className={`container`}>{label}</span>
      </a>
    );
  }
  return (
    <button type={type} className={`button-${mode} ${size}`} {...props}>
      <span className={`container`}>{label}</span>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "reset", "submit", "menu", "link"]),
  mode: PropTypes.oneOf(["fill", "pill", "link"]),
  label: PropTypes.string.isRequired,
  fluid: PropTypes.bool,
};

Button.defaultProps = {
  type: "button",
  label: "Button",
  mode: "fill",
  fluid: false,
};

export default Button;
