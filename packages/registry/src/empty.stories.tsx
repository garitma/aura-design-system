import { PlusIcon, StackIcon } from "@radix-ui/react-icons";
import { Button } from "../registry/default/components/ui/Button";
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
    <Empty className="min-h-32">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <StackIcon className="icon h4" aria-hidden />
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

export const WithActions = () => {
  return (
    <Empty className="min-h-40">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <StackIcon className="icon h4" aria-hidden />
        </EmptyMedia>
        <EmptyTitle>Nothing in this list</EmptyTitle>
        <EmptyDescription>
          Create a record to see it here, or{" "}
          <a href="#browse">browse existing items</a>.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <Button variant="fill" type="button" className="gap-1">
            <PlusIcon className="icon" aria-hidden />
            Add item
          </Button>
          <Button variant="pill" type="button">
            Learn more
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
