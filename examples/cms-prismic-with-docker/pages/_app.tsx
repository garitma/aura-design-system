import "@aura-design/system/main.css";
import type { AppProps } from "next/app";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "@/styles/globals.css";
import "@/styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrismicPreview repositoryName={repositoryName}>
      <Component {...pageProps} />
    </PrismicPreview>
  );
}
