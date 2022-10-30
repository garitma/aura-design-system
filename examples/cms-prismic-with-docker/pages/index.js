import Section from "aura-design/section";
import Grid from "aura-design/grid";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { components as marketingComponents } from "@slices/marketing/index";
import { createClient } from "@utils/prismic-client";
import Layout from "@components/Layout";

const __allComponents = { ...marketingComponents };

const Home = ({ doc }) => {
  return (
    <Layout text={prismicH.asText(doc.data.title)}>
      <SliceZone slices={doc.data.slices} components={__allComponents} />
    </Layout>
  );
};

export async function getStaticProps({ previewData, locale, locales }) {
  const client = createClient(previewData);

  //Querying page
  const document = await client
    .getSingle("home", { lang: locale })
    .catch((e) => {
      return null;
    });
  if (!document) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      doc: document,
    }, // will be passed to the page component as props
  };
}

export default Home;
