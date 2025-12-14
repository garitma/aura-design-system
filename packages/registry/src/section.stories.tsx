import type { Story } from "@ladle/react";

import {
  AuraContainer,
  Section,
} from "../registry/default/components/ui/Section";

export const Default: Story = () => {
  return (
    <Section>
      <h1>Section Title</h1>
      <p>
        This is a default section with some content. Sections help organize and
        structure your content with consistent spacing and layout.
      </p>
    </Section>
  );
};

export const SectionDemo: Story = () => {
  return (
    <Section>
      <h1>Long Text Section</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
        voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
        dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
        est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
        sed quia non numquam eius modi tempora incidunt ut labore et dolore
        magnam aliquam quaerat voluptatem.
      </p>
    </Section>
  );
};

export const ContainersDemo: Story = () => {
  const containers: AuraContainer[] = [
    "smesh",
    "smash",
    "smush",
    "smosh",
    "smish",
  ];

  return (
    <div className="space-y-2">
      {containers.map((container) => (
        <Section container={container} className="bg-gray-3">
          <div className="bg-gray-4 p-4 border border-dashed border-gray-6">
            Content inside {container} container
          </div>
        </Section>
      ))}
    </div>
  );
};
