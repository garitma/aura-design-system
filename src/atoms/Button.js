import React from "react";
import PropTypes from "prop-types";

/**
 * Primary UI component for user interaction
 */

const Button = React.forwardRef(
  (
    { children, className, disabled, label, mode, fluid, link, ...props },
    ref
  ) => {
    const ButtonTag = link ? `<a ref="${ref}>` : "button";
    const classConnect = [className, `button-${mode}`];
    if (fluid) {
      classConnect.push("fluid");
    }
    if (disabled) {
      classConnect.push("disable");
    }

    return (
      <ButtonTag
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
  }
);

Button.propTypes = {
  mode: PropTypes.oneOf(["fill", "pill", "link", "menu"]),
  label: PropTypes.any,
  fluid: PropTypes.bool,
  link: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  label: "Button",
  mode: "fill",
  fluid: false,
  disabled: false
};

export default Button;
