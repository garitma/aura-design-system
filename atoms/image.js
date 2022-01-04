import Image from "next/image";

const MyImage = ({
  width,
  height,
  src,
  aspectRatio,
  fit = "crop",
  ...props
}) => {
  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#a8e7c0" offset="20%" />
        <stop stop-color="#a8e7c0" offset="50%" />
        <stop stop-color="#98eae5" offset="70%" />
        </linearGradient>
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#fee8fc" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const loader = (args) => {
    return `${args.src}&fit=${fit}&w=${args.width}&h=${args.height}`;
  };

  return (
    <Image
      src={src}
      width={width}
      height={height}
      loader={loader}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...props}
    />
  );
};

export default MyImage;
