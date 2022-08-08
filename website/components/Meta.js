import Head from "next/head";
import { useRouter } from "next/router";

import { SITE_URL, SITE_NAME, SOCIAL, SITE_DESCRIPTIO } from "@utils/constants";

const Meta = ({ title, excerpt, image }) => {
  const route = useRouter();
  const slug = route.asPath === "/" ? "" : route.asPath

  return (
    <Head>
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta
        property="og:title"
        content={title ? `${title} | ${SITE_NAME}` : SITE_NAME}
      />
      <link rel="canonical" href={`${SITE_URL}${slug}`} />
      <meta property="og:url" content={`${SITE_URL}${slug}`} />
      <meta name="description" content={excerpt || SITE_DESCRIPTIO} />
      <meta property="og:description" content={excerpt || SITE_DESCRIPTIO} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || SOCIAL.openGrap} />
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