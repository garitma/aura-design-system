import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";

import Layout from "@components/Layout";
import SandboxCode from "@components/SandboxCode";

const Home = ({ doc, menu }) => {
  return (
    <Layout menu={menu}>
      <Grid col="two" className="vfluid g0">
        <SandboxCode />
      </Grid>
    </Layout>
  );
};

export default Home;
