import React from "react";
import PropTypes from "prop-types";

/**
 * Primary UI component for user interaction
 */

const Button = ({
  children,
  className,
  disabled,
  label,
  type,
  mode,
  fluid,
  ...props
}) => {
  const ButtonTag = type === "link" ? "a" : "button";
  const classConnect = [className, `button-${mode}`];
  if (fluid) {
    classConnect.push("fluid");
  }
  if (disabled) {
    classConnect.push("disable");
  }

  return (
    <ButtonTag
      type={type}
      className={classConnect.join(" ").trim()}
      disabled={disabled}
      {...props}
    >
      <span className={`container`}>
        {label}
        {children}
      </span>
    </ButtonTag>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "reset", "submit", "menu", "link"]),
  mode: PropTypes.oneOf(["fill", "pill", "link"]),
  label: PropTypes.any,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  type: "button",
  label: "Button",
  mode: "fill",
  fluid: false,
  disabled: false
};

export default Button;
