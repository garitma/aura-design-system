import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { SITE_URL } from "@/utils/constants";
import { linkResolver } from "@/utils/prismic-client";

export interface LinkProps extends Omit<NextLinkProps, "href"> {
  href?: string;
  url?: string;
  field?: any;
  children?: React.ReactNode;
}

const Link = ({ href, url, children, field, ...props }: LinkProps) => {
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
