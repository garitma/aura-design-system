import Head from "next/head";

import { SITE_URL, SITE_NAME, SITE_DESCRIPTIO } from "@/utils/constants";

export type MetaProps = {
  title?: string;
  excerpt?: string;
  slug?: string;
  image?: string;
};

const Meta = ({ title, excerpt, slug, image }: MetaProps) => {
  return (
    <Head>
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta
        property="og:title"
        content={title ? `${title} | ${SITE_NAME}` : SITE_NAME}
      />
      <link rel="canonical" href={`${SITE_URL}${slug ? slug : ""}`} />
      <meta
        property="og:image:alt"
        content={excerpt || `Open grap de ${SITE_NAME}`}
      />
      <meta property="og:image:width" content="1140" />
      <meta property="og:image:height" content="570" />
    </Head>
  );
};

export default Meta;
