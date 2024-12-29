import { PrismicText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Section from "@aura-design/system/section";
import Separator from "@aura-design/system/separator";


export default async function Footer() {
  const client = createClient();
  const footer = await client.getSingle("footer");

  return (
    <footer id="footer">
      <Separator />
      <Section className="p-1 mb-2 text-center" passDiv>
        <PrismicText field={footer.data.copyright} />
      </Section>
    </footer>
  );
}
