import NextLink from "next/link";

const Link = ({ href, url, children, ...props }) => {

  return <NextLink href={href || url?.replace("https://codingforkids.mintic.gov.co/", "/") || "/"} {...props}>{children}</NextLink>;
};

export default Link