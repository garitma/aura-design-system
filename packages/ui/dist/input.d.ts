import { InputHTMLAttributes } from "react";
import type { SharedBasic, HelpType } from "@aura-design/shate-types/global";
import type { InputValueProps } from "@aura-design/hooks/form";
/**
 * Input component
 */
export interface InputProps extends SharedBasic, Omit<InputHTMLAttributes<HTMLInputElement>, "value">, Omit<InputValueProps, "onChange"> {
    isDisabled?: boolean;
    isLabelable?: boolean;
    helpMode?: HelpType;
    placeholder?: string;
    name?: string;
    classNameContainer?: string;
}
declare const Input: ({ isDisabled, isHelping, isLabelable, helpMode, helpText, placeholder, className, classNameContainer, name, ...props }: InputProps) => JSX.Element;
export default Input;
//# sourceMappingURL=input.d.ts.map