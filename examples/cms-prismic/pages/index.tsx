import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices/index";
import Layout from "@/components/Layout";

type HomeProps = {
  menu: prismic.Content.NavigationDocument;
  doc: prismic.Content.HomeDocument;
  footer: prismic.Content.FooterDocument
};

export default function Home({ doc, menu, footer }: HomeProps) {
  const seo = {
    title: doc.data.meta_title,
    excerpt: prismic.asText(doc.data.meta_description),
    image: doc.data.meta_image.url,
  };

  return (
    <Layout seo={seo} menu={menu} footer={footer}>
      <SliceZone slices={doc.data.slices} components={components} />
    </Layout>
  );
}

export async function getStaticProps({
  previewData,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<HomeProps>> {
  const client = createClient({ previewData });

  try {
    //Querying all data
    const [navigation, home, footer] = await Promise.all([
      client.getByUID("navigation", "menu"),
      client.getSingle("home"),
      client.getSingle("footer")
    ]);

    return {
      props: {
        menu: navigation,
        doc: home,
        footer: footer
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
