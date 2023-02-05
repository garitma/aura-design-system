import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import Section from "@aura-design/system/section";
import Accordion from "@aura-design/system/accordion";
import Icon from "@aura-design/system/icon";

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
          <Section container="smash">
            <Grid col="two">
              <div>
                {doc.data.prev?.id && (
                  <Link field={doc.data.prev} passHref>
                    <Button mode="link" isFluid>
                      <Icon
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </Icon>
                      <span className="wall-pad">
                        {prismicH.asText(doc.data.prev?.data.title)}
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
              <div>
                {doc.data.next?.id && (
                  <Link field={doc.data.next} passHref>
                    <Button mode="link" isFluid>
                      <span className="wall-pad">
                        {prismicH.asText(doc.data.next?.data.title)}
                      </span>
                      <Icon
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </Icon>
                    </Button>
                  </Link>
                )}
              </div>
            </Grid>
          </Section>
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
      fetchLinks: ["document.title", "document.type"],
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
