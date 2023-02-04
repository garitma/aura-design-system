import NextImage from "next/image";

const Image = ({
  width,
  height,
  src,
  url,
  dimensions,
  ...props
}) => {

  return <NextImage src={src || url} {...props} />;
};

export default Image;
