import * as React from "react";
import { AuraContainer, AuraSpace, SharedBasic } from "@aura-design/shate-types/global";
/**
 * Section
 */
export interface SectionProps extends SharedBasic, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    subClassName?: string;
    space?: AuraSpace;
    container?: AuraContainer;
    passDiv?: boolean;
}
declare const Section: ({ children, className, subClassName, space, container, passDiv, ...props }: SectionProps) => JSX.Element;
export default Section;
//# sourceMappingURL=section.d.ts.map