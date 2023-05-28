import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import Section from "@aura-design/system/section";
import Accordion from "@aura-design/system/accordion";
import DocumentationLink from "@/components/DocumentationLink";

import { components as documentationComponents } from "@/slices/documentation/index";
import { components as marketingComponents } from "@/slices/marketing/index";
import { createClient } from "@/utils/prismic-client";
import { menuGraphQuery } from "@/utils/prismic-graphquery";
import Layout from "@/components/Layout";
import MenuDocumentation from "@/components/MenuDocumentation";


const __allComponents = { ...marketingComponents, ...documentationComponents };

const SingleDoc = ({ doc, menu }) => {
  const seo = {
    title: prismicH.asText(doc.data.title),
    excerpt: prismicH.asText(doc.data.excerpt),
  };

  return (
    <Layout seo={seo} menu={menu}>
      <Grid col="docs">
        <MenuDocumentation menu={menu} />
        <div>
          <Section container="smash" className="m-headlines ul-list">
            <h1>{prismicH.asText(doc.data.title)}</h1>
            <SliceZone slices={doc.data.slices} components={__allComponents} />
          </Section>
          <DocumentationLink doc={doc} />
        </div>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps({ params, previewData, locale, locales }) {
  const client = createClient(previewData);

  //Querying page
  const document = await client
    .getByUID("document", params.uid, {
      lang: locale,
      fetchLinks: [
        "document.title",
        "document.type",
        "cheat_sheets_page.title",
        "cheat_sheets_page.excerpt",
      ],
    })
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

export async function getStaticPaths() {
  const client = createClient();

  const documents = await client.getAllByType("document");

  const paths = documents.map((document) => ({
    params: { uid: document.uid },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default SingleDoc;
