import Image from "next/image";
import Section from "aura-design/section";
import Grid from "aura-design/grid";
import Icon from "aura-design/icon";

const Footer = () => {
  return (
    <footer>
      <Section>
        <Grid col="two">
          <div className="one smosh">
            <div className="centertxt-small">
              <ul className="nav-list ">
                <li className="logo-circle item centertxt-small">
                  <a
                    className="halo"
                    href="https://garitma.com"
                    target="_blanl"
                    rel="noopener"
                  >
                    <Image
                      src="https://images.prismic.io/garitma/281392c3-2020-4925-b71e-1d28db63a5bf_garitma-logo.png?auto=compress,format&w=96"
                      width={48}
                      height={48}
                      alt="Logo Garitma"
                    />
                  </a>
                </li>
              </ul>
              <br />
              <span className="h4 light">Aura Design System</span>
            </div>
            <p className="centertxt-small">
              © 2022 Garitma. All rights reserved
            </p>
          </div>
          <div className="two smosh">
            <ul className="nav-list">
              <li className="item">
                <a
                  href="https://www.instagram.com/auradesignsystem/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Open instagram"
                >
                  <Icon sprite="instagram" />
                </a>
              </li>
              <li className="item">
                <a
                  href="https://twitter.com/aura_system"
                  target="_blank"
                  rel="noopener"
                  aria-label="Open twitter"
                >
                  <Icon sprite="twitter" />
                </a>
              </li>
              <li className="item">
                <a
                  href="https://github.com/garitma/aura-design-system"
                  target="_blank"
                  rel="noopener"
                  aria-label="Open github"
                >
                  <Icon className="github" />
                </a>
              </li>
            </ul>
            <ul className="nav-list small-block">
              <li className="item centertxt-small">
                <a
                  target="_blank"
                  rel="noopener"
                  href="http://privacy.garitma.com"
                >
                  Terms of use
                </a>
              </li>
              <li className="item centertxt-small">
                <a
                  target="_blank"
                  rel="noopener"
                  href="http://privacy.garitma.com"
                >
                  Privacy policies
                </a>
              </li>
            </ul>
          </div>
        </Grid>
      </Section>
    </footer>
  );
};

export default Footer;
