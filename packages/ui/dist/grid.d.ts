import { SharedBasic, AuraGrid } from "@aura-design/shate-types/global";
/**
 * Grid
 */
export interface GridProps extends SharedBasic {
    col: AuraGrid;
    isFixed?: boolean;
}
declare const Grid: ({ children, className, col, isFixed, ...props }: GridProps) => JSX.Element;
export default Grid;
//# sourceMappingURL=grid.d.ts.map