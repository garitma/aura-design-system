import { Button } from "../registry/default/components/ui/Button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../registry/default/components/ui/Sheet";

export const Default = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>
            A short description of the sheet content.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
