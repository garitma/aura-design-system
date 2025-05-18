import React, { forwardRef CSSProperties } from "react";

export interface SharedBasic {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export type ButtonMode = "link" | "fill" | "pill" | "menu";

export type ButtonType = "button" | "submit" | "reset";

export type Target = "_self" | "_blank" | "_parent" | "_top" | "framename";

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
  size?: "small" | "default";
  className?: string;
  children?: React.ReactNode;
}

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
      as: AuraButton = href ? `a` : "button",
      size = "default",
      ...props
    }: ButtonProps,
    ref
  ): JSX.Element => {
    const classConnect: string[] = [className!, `button-${mode}`];

    if (isFluid) {
      classConnect.push("fluid");
    }

    if (isDisabled || isLoading) {
      classConnect.push("disabled");
    }

    if (size === "small") {
      classConnect.push("p-1 h-3");
    }

    return (
      <AuraButton
        className={classConnect.join(" ").trim()}
        disabled={isDisabled || isLoading}
        href={href}
        ref={ref}
        {...(props as IntrinsicProps)}
      >
        {isLoading ? isLoadingText : label}
        {children}
      </AuraButton>
    );
  }
);

export default Button;
