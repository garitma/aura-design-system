import { CSSProperties, ElementType } from "react";
import { Target, SharedBasic, ButtonMode, ButtonType } from "@aura-design/shate-types/global";
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
declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export default Button;
//# sourceMappingURL=button.d.ts.map