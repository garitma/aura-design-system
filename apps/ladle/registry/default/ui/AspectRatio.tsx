import { AspectRatio as AspectRatioPradix } from "radix-ui";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPradix.Root>) {
  return <AspectRatioPradix.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
