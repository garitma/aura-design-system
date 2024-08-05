import { SharedBasic } from "@aura-design/shate-types/global";
import { ButtonProps } from "./button";
export interface TabsProps extends SharedBasic {
    data: ButtonProps[];
    classNameWrapper?: string;
    classNameNav?: string;
    classNameContainer?: string;
}
declare const Tabs: ({ children, data, className, classNameWrapper, classNameNav, classNameContainer, }: TabsProps) => import("react/jsx-runtime").JSX.Element;
export default Tabs;
//# sourceMappingURL=tabs.d.ts.map