import { TextareaHTMLAttributes } from "react";
import type { SharedBasic, HelpType } from "@aura-design/shate-types/global";
import { InputValueProps } from "@aura-design/hooks/form";
/**
 * Input component
 */
export interface InputProps extends SharedBasic, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value">, Omit<InputValueProps, "onChange"> {
    onChange: any;
    isDisabled?: boolean;
    isLabelable?: boolean;
    helpMode?: HelpType;
    placeholder?: string;
    name?: string;
    classNameContainer?: string;
}
declare const Textarea: ({ isDisabled, isHelping, isLabelable, helpMode, helpText, placeholder, className, classNameContainer, name, ...props }: InputProps) => JSX.Element;
export default Textarea;
//# sourceMappingURL=textarea.d.ts.map