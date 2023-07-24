import * as React from "react";

import {
  AuraColors,
  AuraContainer,
  AuraSpace,
  SharedBasic,
} from "../types/global";

/**
 * Section
 */

export interface SectionProps
  extends SharedBasic,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  subClassName?: string;
  color?: AuraColors;
  space?: AuraSpace;
  container?: AuraContainer;
  passDiv?: boolean;
}

const Section = ({
  children,
  className,
  subClassName,
  color,
  space = "pad",
  container = "smush",
  passDiv,
  ...props
}: SectionProps): JSX.Element => {
  const SectionTag = passDiv ? `div` : "section";
  const classConnect: string[] = [className!, space];
  const subClassConnect: string[] = [subClassName!, container];

  if (color) {
    classConnect.push(color);
  }

  return (
    <SectionTag className={classConnect.join(" ").trim()} {...props}>
      <div className={subClassConnect.join(" ").trim()}>{children}</div>
    </SectionTag>
  );
};

export default Section;
