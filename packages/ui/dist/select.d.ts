import { SelectHTMLAttributes } from "react";
import type { SharedBasic, HelpType } from "@aura-design/shate-types/global";
import { SelectValueProps } from "@aura-design/hooks/form";
/**
 * Select component
 */
export interface SelectProps extends SharedBasic, Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange">, Omit<SelectValueProps, "onChange"> {
    isDisabled?: boolean;
    isLabelable?: boolean;
    helpMode?: HelpType;
    placeholder?: string;
    name?: string;
    classNameContainer?: string;
}
declare const Select: ({ isDisabled, isHelping, isLabelable, helpMode, helpText, placeholder, className, classNameContainer, name, children, ...props }: SelectProps) => JSX.Element;
export default Select;
//# sourceMappingURL=select.d.ts.map