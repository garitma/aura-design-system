import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { SITE_URL } from "@/utils/constants";

export interface LinkProps extends NextLinkProps {
  url?: string;
  children: React.ReactNode;
}

const Link = ({ href, url, children, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href || url?.replace(SITE_URL, "/") || "/"}
      legacyBehavior
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
