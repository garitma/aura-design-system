import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";

import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type Params = { uid: string };

export const relative = 60;

import { getPrismicSEO } from "@/lib/prismic/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  
  const client = createClient();
  const page = await client.getByUID("doc", params.uid);
  const settings = await client.getSingle("settings");
  
  const seo = getPrismicSEO(page, settings);

  return seo;
}


export default async function SingleDocs({ params }: { params: Params }) {
  const client = createClient();

  const doc = await client.getByUID("doc", params.uid).catch(() => notFound());

  return (
    <div>
      <SliceZone slices={doc.data.slices} components={components} />

      <nav
        aria-label="pagination"
        className="border-t border-black-3 pt-1 smash mt-2 mb-1 px-1 md:px-0"
      >
        <div className="flex justify-between h-auto p-1">
          <div>
            {isFilled.link(doc.data.previous) && (
              <PrismicNextLink
                field={doc.data.previous}
                className="item h-auto"
              >
                <div>
                  <span className="text-black-9">Previous</span>
                </div>
                <div className="flex items-center gap-1 h6 font-medium">
                  <ArrowLeftIcon />
                  <span>{doc.data.previous.text}</span>
                </div>
              </PrismicNextLink>
            )}
          </div>
          <div>
            {isFilled.link(doc.data.next) && (
              <PrismicNextLink field={doc.data.next} className="item h-auto">
                <div>
                  <span className="text-black-9">Next</span>
                </div>
                <div className="flex items-center gap-1 h6 font-medium">
                  <span>{doc.data.next.text}</span>
                  <ArrowRightIcon />
                </div>
              </PrismicNextLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
