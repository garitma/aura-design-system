import NextLink from "next/link";
import { SITE_URL } from "@/utils/constants";
import { linkResolver } from "@/utils/prismic-client";

const Link = ({ href, url, children, field, ...props }) => {
  const hrefResolver = () => {
    if (field?.type) return linkResolver(field);
    if (url) return url?.replace(SITE_URL, "");
    if (href) return href;

    return "/";
  };

  return (
    <NextLink href={hrefResolver()} legacyBehavior {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
