import Section from "@aura-design/system/section";
const Footer = () => {
  return (
    <footer>
      <Section passDiv>
        <span> © {new Date().getFullYear()} Aura Design System</span>
      </Section>
    </footer>
  );
};

export default Footer;

