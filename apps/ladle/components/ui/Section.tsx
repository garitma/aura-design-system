import { Wrapper, WrapperContainer } from "@/components/ui/Wraper";


const Section = ({ children, ...props }) => {
  <Wrapper {...props}>
    <WrapperContainer>{children}</WrapperContainer>
  </Wrapper>;
};


export default Section