import * as React from "react";

import {
  AuraContainer,
  AuraSpace,
  SharedBasic,
} from "@aura-design/shate-types/global";

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
  space?: AuraSpace;
  container?: AuraContainer;
  passDiv?: boolean;
}

const Section = ({
  children,
  className,
  subClassName,
  space = "pad",
  container = "smush",
  passDiv,
  ...props
}: SectionProps): JSX.Element => {
  const SectionTag = passDiv ? `div` : "section";
  const classConnect: string[] = [className!, space];
  const subClassConnect: string[] = [subClassName!, container];

  return (
    <SectionTag className={classConnect.join(" ").trim()} {...props}>
      <div className={subClassConnect.join(" ").trim()}>{children}</div>
    </SectionTag>
  );
};

export default Section;
