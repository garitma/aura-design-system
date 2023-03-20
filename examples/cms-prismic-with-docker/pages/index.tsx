import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { Content } from "@prismicio/client";

import { components as marketingComponents } from "@/slices/marketing/index";
import { createClient } from "@/utils/prismic-client";
import { menuGraphQuery } from "@/utils/prismic-graphquery";
import Layout from "@/components/Layout";

const __allComponents = { ...marketingComponents };

type HomeProps = {
  doc: Content.HomeDocument;
  menu: any;
};

const Home = ({ doc, menu }: HomeProps) => {
  return (
    <Layout menu={menu}>
      <SliceZone slices={doc.data.slices} components={__allComponents} />
    </Layout>
  );
};

export async function getStaticProps({
  previewData,
  locale,
  locales,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<HomeProps>> {
  const client = createClient({previewData});

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

  //Querying the Menu here so that it can be previewed at the same time as the page (in a release)
  const menu = await client
    .getSingle("menu", { lang: locale, graphQuery: menuGraphQuery })
    .catch((e) => {
      return {};
    });

  return {
    props: {
      menu: menu,
      doc: document,
    }, // will be passed to the page component as props
  };
}

export default Home;
