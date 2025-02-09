import Link from "next/link";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices/index";
import { createClient } from "@/prismicio";

export default async function Home() {
  const client = createClient();
  const doc = await client.getSingle("home").catch((e) => notFound());

  return (
    <>
      <SliceZone slices={doc.data.slices} components={components} />
    </>
  );
}
