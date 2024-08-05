import { SharedBasic, AuraColors } from "@aura-design/shate-types/global";

export interface SeparatorProps extends SharedBasic {
  isVertical?: boolean;
  color?: AuraColors;
  stroke?: number;
  heightAspectRation?: number;
}

const Separator = ({
  isVertical,
  color = "accents-3",
  className,
  stroke = 1,
  heightAspectRation = 2,
}: SeparatorProps): JSX.Element => {
  const classConnect: string[] = [className!, color];

  if (isVertical) {
    classConnect.push("vfluid ml13 mr13");
  } else {
    classConnect.push("fluid mt13 mb13");
  }

  return (
    <hr
      className={classConnect.join(" ")}
      style={
        isVertical
          ? { width: stroke, minHeight: heightAspectRation * 13 }
          : { height: stroke }
      }
    />
  );
};

export default Separator;
