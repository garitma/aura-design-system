import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices/index";
import Layout from "@/components/Layout";

type HomeProps = {
  doc: prismic.Content.HomeDocument;
};

export default function Home({ doc }: HomeProps) {
  const seo = {
    title: doc.data.meta_title,
    excerpt: prismic.asText(doc.data.meta_description),
    image: doc.data.meta_image.url,
  };

  return (
    <Layout seo={seo}>
      <SliceZone slices={doc.data.slices} components={components} />
    </Layout>
  );
}

export async function getStaticProps({
  previewData,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<HomeProps>> {
  const client = createClient({ previewData });

  //Querying page
  const document = await client.getSingle("home").catch((e) => {
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
