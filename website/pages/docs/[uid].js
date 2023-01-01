import * as prismicH from "@prismicio/helpers";
import { SliceZone } from "@prismicio/react";

import { components } from "@slices/marketing";
import { createClient, linkResolver } from "@utils/prismic-client";
import Layout from "@components/Layout";

const Documents = ({ doc }) => {
  const seo = {
    title: prismicH.asText(doc.data.title),
    excerpt: prismicH.asText(doc.data.excerpt),
  };

  return (
    <Layout text="Aura Design System" seo={seo}>
      <div>
        <div>
          <article className="pad ulinea">
            <div className="smash">
              <h1>{prismicH.asText(doc.data.title)}</h1>
              <SliceZone slices={doc.data.slices} components={components} />
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
  locale,
}) => {
  try {
    const client = createClient({ previewData });

    const doc = await client.getByUID("document", params.uid, { lang: locale });

    if (!doc) {
      return { notFound: true };
    }

    return {
      props: {
        doc,
        preview,
      },
      revalidate: 60 * 3,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export async function getStaticPaths() {
  const client = createClient();
  const doc = await client.getAllByType("document");

  return {
    paths: doc.map((item) => prismicH.asLink(item, linkResolver)),
    fallback: "blocking",
  };
}

export default Documents;
