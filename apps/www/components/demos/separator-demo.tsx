import { Separator } from "@/components/ui/Separator";

export const SeparatorDemo = () => {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-gray-a11 text-sm">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-1" />
      <div className="flex h-1 items-center space-x-1 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
};