import type { AppProps } from 'next/app'
import Router from "next/router";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import "@aura-design/system/main.css";
import "nprogress/nprogress.css"

import { repositoryName } from "@/utils/prismic-client";
import "@/styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
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
