import { forwardRef, RefObject, CSSProperties, ElementType } from "react";
import { Target, SharedBasic, ButtonMode, ButtonType } from "../types/global";

interface IntrinsicProps {
  onClick?: (event?: any) => void;
  target?: Target;
  type?: ButtonType;
  style?: CSSProperties;
}

export interface ButtonProps extends SharedBasic, IntrinsicProps {
  isDisabled?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  isLoadingText?: string;
  mode?: ButtonMode;
  label?: string;
  href?: string;
  as?: ElementType;
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
      as: AuraButton = href || mode === "menu" ? `a` : "button",
      ...props
    }: ButtonProps,
    ref: RefObject<HTMLAnchorElement | HTMLButtonElement>
  ): JSX.Element => {
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
        {...props as IntrinsicProps}
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
