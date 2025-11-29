import { Link } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  id?: string;
  as?: HeadingLevel;
}

function HeadingBase({
  id,
  children,
  as: Component = "h2",
  ...props
}: HeadingProps) {
  return (
    <Component
      id={id}
      className="flex scroll-m-2 flex-row items-center gap-2"
      {...props}
    >
      <a data-card="" href={`#${id}`} className="peer">
        {children}
      </a>
      <Link
        className="icon shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100"
        aria-label="Link to section"
      />
    </Component>
  );
}

export function Heading1(props: Omit<HeadingProps, "as">) {
  return <HeadingBase as="h1" {...props} />;
}

export function Heading2(props: Omit<HeadingProps, "as">) {
  return <HeadingBase as="h2" {...props} />;
}

export function Heading3(props: Omit<HeadingProps, "as">) {
  return <HeadingBase as="h3" {...props} />;
}

export function Heading4(props: Omit<HeadingProps, "as">) {
  return <HeadingBase as="h4" {...props} />;
}

export function Heading5(props: Omit<HeadingProps, "as">) {
  return <HeadingBase as="h5" {...props} />;
}

export function Heading6(props: Omit<HeadingProps, "as">) {
  return <HeadingBase as="h6" {...props} />;
}
