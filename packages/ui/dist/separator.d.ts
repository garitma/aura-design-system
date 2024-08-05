import { SharedBasic, AuraColors } from "@aura-design/shate-types/global";
export interface SeparatorProps extends SharedBasic {
    isVertical?: boolean;
    color?: AuraColors;
    stroke?: number;
    heightAspectRation?: number;
}
declare const Separator: ({ isVertical, color, className, stroke, heightAspectRation, }: SeparatorProps) => JSX.Element;
export default Separator;
//# sourceMappingURL=separator.d.ts.map