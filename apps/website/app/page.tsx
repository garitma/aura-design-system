import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { getPrismicSEO } from "@/lib/prismic/utils/seo";

export async function generateMetadata() {
  
  const client = createClient();
  const doc = await client.getSingle("home").catch((e) => notFound());
  const settings = await client.getSingle("settings").catch((e) => notFound());

  return getPrismicSEO(doc, settings);
}

export default async function Home() {
  const client = createClient();
  const doc = await client.getSingle("home").catch((e) => notFound());

  return (
    <>
      <SliceZone slices={doc.data.slices} components={components} />
    </>
  );
}
