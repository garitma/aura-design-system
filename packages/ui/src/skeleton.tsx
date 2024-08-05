import { SharedBasic } from "@aura-design/shate-types/global";

export interface SkeletonProps extends SharedBasic {
  isVertical?: boolean;
  heightAspectRation?: number;
  widthAspectRation?: number;
  isCircle?: boolean;
  isFluid?: boolean;
}

const Skeleton = ({
  heightAspectRation = 1,
  widthAspectRation = 1,
  className,
  isCircle,
  isFluid,
  ...props
}: SkeletonProps): JSX.Element => {
  const classConnect: string[] = [className!, "skeleton"];

  if (isCircle) {
    classConnect.push("circle");
  }

  if (isFluid) {
    classConnect.push("fluid");
  }

  return (
    <div
      className={classConnect.join(" ")}
      style={{ height: heightAspectRation * 13, width: widthAspectRation * 13 }}
      {...props}
    />
  );
};

export default Skeleton;
