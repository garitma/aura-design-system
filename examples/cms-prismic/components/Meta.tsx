import Head from "next/head";
import { useRouter } from "next/router";
import * as prismic from "@prismicio/client";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTIO,
  SOCIAL,
} from "@/utils/constants";

export type MetaProps = {
  title?: string | prismic.KeyTextField;
  excerpt?: string | prismic.KeyTextField;
  image?: string | prismic.KeyTextField;
};

const Meta = ({ title, excerpt, image }: MetaProps) => {
  const route = useRouter();
  const slug = route.asPath.substring(1);

  return (
    <Head>
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta name="description" content={excerpt || SITE_DESCRIPTIO} />
      <meta
        property="og:title"
        content={title ? `${title} | ${SITE_NAME}` : SITE_NAME}
      />
      <meta property="og:description" content={excerpt || SITE_DESCRIPTIO} />
      <link rel="canonical" href={`${SITE_URL}${slug}`} />
      <meta property="og:url" content={`${SITE_URL}${slug}`} />
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
