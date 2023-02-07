import Image from "next/image";
import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import Icon from "@aura-design/system/icon";

const Footer = () => {
  return (
    <footer>
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
