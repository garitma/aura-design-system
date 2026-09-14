import { ImageResponse } from "next/og";
import { generate as DefaultImage } from "fumadocs-ui/og";
import {
  siteName,
  siteOgDescription,
  siteOgImage,
  siteOgTitle,
} from "@/utils/site";

export const revalidate = false;

export function GET() {
  return new ImageResponse(
    (
      <DefaultImage
        title={siteOgTitle}
        description={siteOgDescription}
        site={siteName}
      />
    ),
    {
      width: siteOgImage.width,
      height: siteOgImage.height,
    }
  );
}
