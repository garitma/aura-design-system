import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import * as Phanthom from "phantom-client";

import "@aura-design/system/main.css";
import "nprogress/nprogress.css";

import { repositoryName } from "@/utils/prismic-client";
import "@/styles/main.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    Phanthom.load(process.env.NEXT_PUBLIC_PHANTOM_SITE_CODE as string, {
      includedDomains: ["auradesignsystem.com"],
      accessToken: process.env.NEXT_PUBLIC_FAUNA_SECRET as string,
    });

    function onRouteChangeComplete() {
      Phanthom.trackPageview();
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
