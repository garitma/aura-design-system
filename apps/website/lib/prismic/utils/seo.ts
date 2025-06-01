import { Metadata } from "next";
import { asText, isFilled, asLink, Content } from "@prismicio/client";

export function getPrismicSEO(
  doc: Content.HomeDocument | Content.DocDocument,
  settings: Content.SettingsDocument
): Metadata {
  const siteName = settings.data.site_name;
  const title = doc.data.meta_title;
  const description =
    doc.data.meta_description ?? settings.data.site_description;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return {
    metadataBase: isFilled.keyText(settings.data.public_url)
      ? new URL(settings.data.public_url)
      : null,
    title: fullTitle,
    description,
    alternates: {
      canonical: asLink(doc),
    },
    openGraph: {
      title: fullTitle as string,
      description: description as string,
      url: asLink(doc) as string,
      images: isFilled.image(doc.data.meta_image)
        ? doc.data.meta_image.url
        : isFilled.image(settings.data.open_graph)
          ? settings.data.open_graph.url
          : undefined,
    },
  };
}
