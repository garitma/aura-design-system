import Image from "next/image";
import Section from "aura-design/section";
import Grid from "aura-design/grid";
import Icon from "aura-design/icon";

const Footer = () => {
  return (
    <footer className="accents-3 white-text">
      <Section>
        <p className="centertxt">
          Powered by{" "}
          <a href="https://auradesigsystem.com" className="uline">
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
