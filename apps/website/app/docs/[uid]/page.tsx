import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function SingleDocs({ params }) {
  const client = createClient();

  const doc = await client.getByUID("doc", params.uid).catch(() => notFound());

  return (
    <>
      {" "}
      <SliceZone slices={doc.data.slices} components={components} />
    </>
  );
}
