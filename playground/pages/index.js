import Section from "aura-design/section";
import Grid from "aura-design/grid";

import Layout from "@components/Layout";
import SandboxCode from "@components/SandboxCode"

const Home = ({ doc, menu }) => {
  return (
    <Layout menu={menu}>
      <Grid col="two" className="vfluid">
        <SandboxCode />
      </Grid>
    </Layout>
  );
};

export default Home;
