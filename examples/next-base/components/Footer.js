import Section from "@aura-design/system/section";

const Footer = () => {
  return (
    <footer>
      <Section>
        <p className="centertxt">
          Powered by{" "}
          <a href="https://auradesignsystem.com" className="uline">
            Aura Design System
          </a>{" "}
          brought to you by{" "}
          <a href="https://garitma.com" className="uline">
            Garitma
          </a>
          .
        </p>
      </Section>
    </footer>
  );
};

export default Footer;
