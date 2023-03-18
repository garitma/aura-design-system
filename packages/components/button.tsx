import { forwardRef } from "react";
import { Target, SharedBasic, ButtonMode, ButtonType } from "../types/global";

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps extends SharedBasic {
  isDisabled?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  onClick?: (event?: any) => void;
  isLoadingText?: string;
  mode?: ButtonMode;
  label?: string;
  href?: string;
  target?: Target;
  type?: ButtonType;
}

const Button = forwardRef(
  (
    {
      isDisabled = false,
      isFluid = false,
      isLoading = false,
      isLoadingText = "...",
      mode = "fill",
      label,
      className,
      href,
      children,
      ...props
    }: ButtonProps,
    ref: any
  ): JSX.Element => {
    const AuraButton = href || mode === "menu" ? `a` : "button";
    const classConnect: string[] = [className!, `button-${mode}`];

    if (isFluid) {
      classConnect.push("fluid");
    }
    if (isDisabled || isLoading) {
      classConnect.push("disabled");
    }

    return (
      <AuraButton
        className={classConnect.join(" ").trim()}
        disabled={isDisabled || isLoading}
        href={href}
        ref={ref}
        {...props}
      >
        <span className={`container`}>
          {isLoading ? isLoadingText : label}
          {children}
        </span>
      </AuraButton>
    );
  }
);

export default Button;
