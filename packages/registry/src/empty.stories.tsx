import { EyeClosedIcon } from "@radix-ui/react-icons";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "../registry/default/components/ui/Empty";

export const Default = () => {
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
