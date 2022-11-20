import NextLink from "next/link";
import { SITE_URL } from "@utils/constants";

const Link = ({ href, url, children, ...props }) => {
  return (
    <NextLink href={href || url?.replace(SITE_URL, "/") || "/"} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
