import GLOBAL from "garitmic.config.json";
import Head from "next/head";
import { RichText } from "prismic-reactjs";

export const formatMeta = (doc) => {
  return (
    <Head>
      <title>
        {RichText.asText(doc?.title || [])} {doc?.title && "|"}{" "}
        {GLOBAL.siteName}
      </title>
      <link
        rel="canonical"
        href={`${GLOBAL.siteURL}${
          doc?._meta?.uid ? `/${doc?._meta?.uid}` : ""
        }`}
      />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta
        name="description"
        content={RichText.asText(doc?.excerpt || []) || GLOBAL.siteDescription}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${GLOBAL.social.twitter}`} />
      <meta name="twitter:creator" content={`@${GLOBAL.social.twitter}`} />
      <meta
        property="og:url"
        content={`${GLOBAL.siteURL}${
          doc?._meta?.uid ? `/${doc?._meta?.uid}` : ""
        }`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={GLOBAL.siteName} />
      <meta
        property="og:description"
        content={RichText.asText(doc?.excerpt || []) || GLOBAL.siteDescription}
      />
      <meta property="og:image" content={GLOBAL.social.openGrap} />
      <meta
        property="og:image:alt"
        content={
          doc?.featured_img?.alt ||
          RichText.asText(doc?.excerpt || []) ||
          `Open Grap logo ${GLOBAL.siteName}`
        }
      />
      <meta property="og:image:width" content="1140" />
      <meta property="og:image:height" content="570" />
    </Head>
  );
};

export const formatMetaArchives = (doc) => (
  <Head>
    <title>
      Archivos {doc && `página ${doc?.page}`} | {GLOBAL.siteName}
    </title>
    <meta name="robots" content="index,follow" />
    <meta name="googlebot" content="index,follow" />
    <meta name="description" content={GLOBAL.siteDescription} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={`@${GLOBAL.social.twitter}`} />
    <meta name="twitter:creator" content={`@${GLOBAL.social.twitter}`} />
    <meta
      property="og:url"
      content={`${GLOBAL.siteURL}/archivos${doc ? "/pagina/" : ""}${
        doc ? doc?.page : ""
      }`}
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={GLOBAL.siteName} />
    <meta property="og:description" content={GLOBAL.siteDescription} />
    <meta property="og:image" content={GLOBAL.social.openGrap} />
    <meta property="og:image:alt" content="Open Graph logo Garitma" />
    <meta property="og:image:width" content="1140" />
    <meta property="og:image:height" content="570" />
    <link
      rel="canonical"
      href={`${GLOBAL.siteURL}/archivos${doc ? "/pagina/" : ""}${
        doc ? doc?.page : ""
      }`}
    />
  </Head>
);
