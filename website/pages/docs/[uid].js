import * as prismicH from "@prismicio/helpers";
import { SliceZone } from "@prismicio/react";

import { components } from "@slices/index";
import { createClient, linkResolver } from "@utils/prismic-client";
import Layout from "@components/Layout";

const Documents = ({ doc }) => {
  // const seo = {
  //   title: prismicH.asText(doc.data.title),
  //   excerpt: prismicH.asText(doc.data.excerpt),
  // };

  // const formatBody = () => {
  //   let newBody = [];
  //   let tableTransition = [];

  //   for (const slice of doc.data.body) {
  //     if (["table", "table_row", "table_footer"].includes(slice.slice_type)) {
  //       tableTransition.push(slice);
  //       if (["table_footer"].includes(slice.slice_type)) {
  //         let virtualSlice = {
  //           primary: null,
  //           items: tableTransition,
  //           id: tableTransition.map((item) => item.id).join("-"),
  //           slice_type: "table_group",
  //         };
  //         newBody.push(virtualSlice);
  //         virtualSlice = [];
  //       }
  //     } else {
  //       newBody.push(slice);
  //     }
  //   }

  //   return newBody;
  // };

  return (
    <Layout text="Aura Design System">
      <div>
        <div className="aureole docs">
          <div className="pad purple">{/* <SidebarMenu />  */}</div>
          <article className="pad accents-1 h6 ulinea">
            <div className="smash">
              <h1>{prismicH.asText(doc.data.title)}</h1>
              <SliceZone
                slices={doc.data.slices}
                components={components}
              />
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
