import { EyeClosedIcon } from "@radix-ui/react-icons";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/Empty";

export const EmptyDemo = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <EyeClosedIcon className="icon h1" />
        </EmptyMedia>
        <EmptyTitle>No items yet</EmptyTitle>
        <EmptyDescription>
          Get started by adding your first item. You can always change this
          later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};