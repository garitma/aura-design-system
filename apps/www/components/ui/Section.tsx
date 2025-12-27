import * as React from "react";

import { cn } from "@/utils/class-names";

export type AuraContainer = "smash" | "smesh" | "smish" | "smosh" | "smush";

function Wrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <section className={cn("pad", className)} data-slot="wrapper" {...props} />
  );
}

function WrapperContainer({
  container = "smush",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  container?: AuraContainer;
  className?: string;
}) {
  return (
    <div
      data-slot="wrapper-container"
      className={cn(container, className)}
      {...props}
    />
  );
}

type SectionProps = {
  children: React.ReactNode;
  container?: React.ComponentProps<typeof WrapperContainer>["container"];
  subClassName?: string;
} & React.ComponentProps<typeof Wrapper>;

const Section = ({
  children,
  container,
  subClassName,
  ...props
}: SectionProps) => {
  return (
    <Wrapper {...props}>
      <WrapperContainer container={container} className={subClassName}>
        {children}
      </WrapperContainer>
    </Wrapper>
  );
};

export { Wrapper, WrapperContainer, Section };
