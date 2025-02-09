import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import Button from "@/components/ui/Button";
import { PrismicNextLink } from "@prismicio/next";

export default async function SingleDocs({ params }) {
  const client = createClient();

  const doc = await client.getByUID("doc", params.uid).catch(() => notFound());

  return (
    <div>
      <SliceZone slices={doc.data.slices} components={components} />

      <nav
        aria-label="pagination"
        className="border-t border-black-3 pt-1 smash"
      >
        <div className="md:flex justify-between h-auto">
          <div>
            {isFilled.link(doc.data.previous) && (
              <PrismicNextLink field={doc.data.previous} className="item h-auto">
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
