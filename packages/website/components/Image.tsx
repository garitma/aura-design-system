import NextImage, { ImageProps as NextImageProps } from "next/image";

export interface ImageProps extends NextImageProps {
  src: string;
  url?: string;
  dimensions?: {
    height?: number;
    width?: number;
  };
}

const Image = ({ src, url, dimensions, ...props }: ImageProps) => {
  return <NextImage src={src || url} {...props} />;
};

export default Image;
