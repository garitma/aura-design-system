import React from "react";
import type { Story } from "@ladle/react";
import Accordion from "../components/ui/Accordion";

export const Default: Story = () => {
  const items = [
    {
      title: "What is an accordion?",
      content: "An accordion is a vertically stacked set of interactive headings that each reveal a section of content."
    },
    {
      title: "When to use accordions?",
      content: "Use accordions to organize related information into collapsible sections, making it easier for users to digest content by showing only what they want to see."
    },
    {
      title: "How does it work?",
      content: "Click on any header to expand its content. Only one section can be open at a time."
    }
  ];

  return <Accordion items={items} />;
};
