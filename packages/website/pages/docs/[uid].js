import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import Section from "@aura-design/system/section";
import Accordion from "@aura-design/system/accordion";
import DocumentationLink from "@/components/DocumentationLink";

import { components as marketingComponents } from "@/slices/marketing/index";
import { createClient } from "@/utils/prismic-client";
import { menuGraphQuery } from "@/utils/prismic-graphquery";
import Layout from "@/components/Layout";
import Link from "@/components/Link";

const __allComponents = { ...marketingComponents };

const SingleDoc = ({ doc, menu }) => {
  const seo = {
    title: prismicH.asText(doc.data.title),
    excerpt: prismicH.asText(doc.data.excerpt),
  };

  return (
    <Layout seo={seo} menu={menu}>
      <Grid col="docs">
        <div className="purple pad anchor">
          <div className="hide-large">
            <Accordion title="Documentation">
              <ul>
                <li>
                  <h4 className="mt13 h6">Overview</h4>
                </li>
                <li>
                  <Link href="/docs/getting-started" passHref>
                    <Button mode="link">Getting Starter</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/cheat-sheet" passHref>
                    <Button mode="link">Cheat Sheet</Button>
                  </Link>
                </li>
              </ul>
            </Accordion>
          </div>
          <div className="sticky hide-small hide-medium">
            <ul>
              <li>
                <h4 className="mt13 h6">Overview</h4>
              </li>
              <li>
                <Link href="/docs/getting-started" passHref>
                  <Button mode="link">Getting Starter</Button>
                </Link>
              </li>
              <li>
                <Link href="/docs/cheat-sheet" passHref>
                  <Button mode="link">Cheat Sheet</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Section container="smash" className="m-headlines">
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
