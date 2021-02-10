import React from "react";
import PropTypes from "prop-types";

/**
 * Primary UI component for user interaction
 */

const Button = React.forwardRef(
  (
    {
      isDisabled,
      isFluid,
      isWaiting,
      waitingText,
      mode,
      label,
      className,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const AuraButton = href || mode === "menu" ? `a` : "button";
    const classConnect = [className, `button-${mode}`];
    if (isFluid) {
      classConnect.push("fluid");
    }
    if (isDisabled || isWaiting) {
      classConnect.push("disabled");
    }

    return (
      <AuraButton
        className={classConnect.join(" ").trim()}
        disabled={isDisabled || isWaiting}
        ref={ref}
        href={href}
        {...props}
      >
        <span className={`container`}>
          {isWaiting ? waitingText : label}
          {children}
        </span>
      </AuraButton>
    );
  }
);

Button.propTypes = {
  isFluid: PropTypes.bool,
  isWaiting: PropTypes.bool,
  isDisabled: PropTypes.bool,
  mode: PropTypes.oneOf(["fill", "pill", "link", "menu"]),
  label: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  isFluid: false,
  isWaiting: false,
  waitingText: "Loading...",
  mode: "fill",
};

export default Button;
