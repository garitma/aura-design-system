import Section from "@/components/ui/Section";
const Footer = () => {
  return (
    <footer className="border-t border-black-3">
      <Section passDiv className="p-1">
        <p>Built by Garitma. The source code is available on <a href="https://github.com/garitma/aura-design-system" className="underline" target="_blank">GitHub</a>.</p>
      </Section>
    </footer>
  );
};

export default Footer;
