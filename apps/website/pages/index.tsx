import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import { components as marketingComponents } from "@/slices/marketing/index";
import { createClient } from "@/utils/prismic-client";
import { menuGraphQuery } from "@/utils/prismic-graphquery";
import Layout from "@/components/Layout";

const __allComponents = { ...marketingComponents };

type HomeProps = {
  menu: any;
  doc: any;
};

const Home = ({ doc, menu }) => {
  return (
    <Layout menu={menu}>
      <SliceZone slices={doc.data.slices} components={__allComponents} />
    </Layout>
  );
};

export async function getStaticProps({
  previewData,
  locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<HomeProps>> {
  const client = createClient({ previewData });

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
    revalidate: 30, // In seconds
  };
}

export default Home;
