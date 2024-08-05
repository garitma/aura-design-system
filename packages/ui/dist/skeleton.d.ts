import { SharedBasic } from "@aura-design/shate-types/global";
export interface SkeletonProps extends SharedBasic {
    isVertical?: boolean;
    heightAspectRation?: number;
    widthAspectRation?: number;
    isCircle?: boolean;
    isFluid?: boolean;
}
declare const Skeleton: ({ heightAspectRation, widthAspectRation, className, isCircle, isFluid, ...props }: SkeletonProps) => JSX.Element;
export default Skeleton;
//# sourceMappingURL=skeleton.d.ts.map