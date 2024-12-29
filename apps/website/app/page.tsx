import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { getPrismicSEO } from "@/lib/prismic/utils/seo";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getSingle("homepage");
  const settings = await client.getSingle("settings");
  const seo = getPrismicSEO(home, settings);

  return seo;
}

export default async function Home() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}
