import Router from "next/router";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import "aura-design/style.css";

import { repositoryName } from "@utils/prismic-client";
import "../public/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />{" "}
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
