import { forwardRef, RefObject, CSSProperties, ElementType } from "react";
import { Target, SharedBasic, ButtonMode, ButtonType } from "../types/global";

// Props that are inherited from the intrinsic HTML button or anchor tag
interface IntrinsicProps {
  onClick?: (event?: any) => void;
  target?: Target;
  type?: ButtonType;
  style?: CSSProperties;
}

// Props specific to the Button component
export interface ButtonProps extends SharedBasic, IntrinsicProps {
  isDisabled?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  isLoadingText?: React.ReactNode;
  mode?: ButtonMode;
  label?: React.ReactNode;
  href?: string;
  as?: any;
}

// ForwardRef allows the component to receive a ref from its parent component
// The generic parameters are the component's expected props and ref type
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
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
      as: AuraButton = href || mode === "menu" ? `a` : "button",
      ...props
    }: ButtonProps,
    ref: RefObject<HTMLAnchorElement | HTMLButtonElement>
  ): JSX.Element => {
    // An array to hold the class names for the button
    const classConnect: string[] = [className!, `button-${mode}`];

    // Add a "fluid" class to make the button expand to the width of its container
    if (isFluid) {
      classConnect.push("fluid");
    }

    // Add a "disabled" class if the button is disabled or loading
    if (isDisabled || isLoading) {
      classConnect.push("disabled");
    }

    return (
      // Render an anchor tag if there is an href prop, or if the mode is "menu"
      // Otherwise, render a button element
      <AuraButton
        className={classConnect.join(" ").trim()}
        disabled={isDisabled || isLoading}
        href={href}
        ref={ref}
        {...(props as IntrinsicProps)}
      >
        {/* The button label, or an isLoadingText spinner if isLoading is true */}
        <span className={`container`}>
          {isLoading ? isLoadingText : label}
          {children}
        </span>
      </AuraButton>
    );
  }
);

export default Button;