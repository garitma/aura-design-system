import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import * as Fathom from "fathom-client";
import "@aura-design/system/main.css";
import "nprogress/nprogress.css";

import { repositoryName } from "@/utils/prismic-client";
import "@/styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    Fathom.load(`${process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE}`, {
      includedDomains: ["auradesignsystem.com"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);

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
