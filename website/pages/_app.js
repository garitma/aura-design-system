import Router from "next/router";
import "aura-design/style.css";
import WithMotionObserver from "aura-design/motion";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import { linkResolver, repositoryName } from "@utils/prismic-client";
import "../public/style.css";
import "../public/aura.css";

import * as gtag from "@utils/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <WithMotionObserver>
          <Component {...pageProps} />
        </WithMotionObserver>
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
