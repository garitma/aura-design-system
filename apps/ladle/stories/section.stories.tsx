import React from "react";
import Section from "@/components/Section";
import { Wrapper, WrapperContainer } from "@/components/ui/Wrapper";

export function WrapperDemo() {
  return (
    <Wrapper className="bg-gray-3">
      <WrapperContainer>
        <h1>Section with Wrapper Demo</h1>
        <p>This is a section demo.</p>
      </WrapperContainer>
    </Wrapper>
  );
}

export function SectionDemo() {
  return (
    <Section className="bg-gray-3">
      <h1>Section Demo</h1>
      <p>This is a section demo.</p>
    </Section>
  );
}
