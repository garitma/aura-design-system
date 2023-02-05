import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import Section from "@aura-design/system/section";
import Accordion from "@aura-design/system/accordion";
import Icon from "@aura-design/system/icon";

import { components as marketingComponents } from "@/slices/marketing/index";
import { components as documentationComponents } from "@/slices/documentation/index";
import { createClient } from "@/utils/prismic-client";
import { menuGraphQuery } from "@/utils/prismic-graphquery";
import Layout from "@/components/Layout";
import DocumentationLink from "@/components/DocumentationLink";
import Link from "@/components/Link";

const __allComponents = { ...marketingComponents, ...documentationComponents };

const CheatSheet = ({ doc, menu }) => {
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
            {doc.data.title && <h1>{prismicH.asText(doc.data.title)}</h1>}
            {doc.data.excerpt && <p>{prismicH.asText(doc.data.excerpt)}</p>}
            <Grid col="two">
              <SliceZone
                slices={doc.data.slices}
                components={__allComponents}
              />
            </Grid>
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
    .getSingle("cheat_sheets_page", {
      lang: locale,
      fetchLinks: ["document.title", "document.type", "document.excerpt"],
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
  };
}

export default CheatSheet;
