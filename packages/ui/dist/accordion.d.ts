import { SharedBasic, AuraHeadline, AuraColors } from "@aura-design/shate-types/global";
export interface AccordionProps extends SharedBasic {
    title?: string | React.ReactNode;
    headerSize?: AuraHeadline;
    color?: AuraColors;
}
declare const Accordion: ({ title, children, headerSize, className, }: AccordionProps) => JSX.Element;
export default Accordion;
//# sourceMappingURL=accordion.d.ts.map