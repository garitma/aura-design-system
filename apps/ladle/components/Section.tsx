import { Wrapper, WrapperContainer } from "@/components/ui/Wrapper";

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
  <Wrapper {...props}>
    <WrapperContainer container={container} className={subClassName}>
      {children}
    </WrapperContainer>
  </Wrapper>;
};

export default Section;
