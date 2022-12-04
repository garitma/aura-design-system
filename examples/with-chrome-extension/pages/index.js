import Section from "aura-design/section";
import Grid from "aura-design/grid";

import Layout from "@components/Layout";

const Home = () => {
  return (
    <Layout text="Aura Design Next Base">
      <Section color="yellow" className="centertxt">
        <h2>Welcome to my imagination</h2>
        <p>
          Get started by editing{" "}
          <span className="wall-pad info info-text">public/style.css</span>
        </p>
      </Section>
      <Section color="blue">
        <Grid col="two">
          <a
            href="https://auradesignsystem.com"
            target="_blank"
            className="mod"
          >
            <div className="mod-detail">
              <h3 className="mod-title mb0">
                Documentation <i className="icon arrowAltRigth" />
              </h3>
              <p>
                Find in-depth information about Aura Design System features.
              </p>
            </div>
          </a>
          <a
            href="https://github.com/garitma/aura-design-system/tree/main/examples"
            target="_blank"
            className="mod"
          >
            <div className="mod-detail">
              <h3 className="mod-title mb0">
                Examples <i className="icon arrowAltRigth" />
              </h3>
              <p>
                Discover and deploy boilerplate example Aura Design System
                projects.
              </p>
            </div>
          </a>
          <a
            href="https://auradesignsystem.com"
            target="_blank"
            className="mod"
          >
            <div className="mod-detail">
              <h3 className="mod-title mb0">
                Let's be clear, I don't care about you{" "}
                <i className="icon arrowAltRigth" />
              </h3>
              <p>
                Aura Design System is built under its own rules, it is very
                structured and not very flexible, designed to solve my problems.
                If my problems are yours too, welcome.
              </p>
            </div>
          </a>
          <a
            href="https://auradesignsystem.com/docs/getting-started"
            target="_blank"
            className="mod"
          >
            <div className="mod-detail">
              <h3 className="mod-title mb0">
                Before you start - Disclaimer{" "}
                <i className="icon arrowAltRigth" />
              </h3>
              <p>
                This library is CSS centric with Object-Oriented CSS (OOCSS) and
                Atomic Desing metodology.
              </p>
            </div>
          </a>
        </Grid>
      </Section>
    </Layout>
  );
};

export default Home;
