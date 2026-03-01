import { useState } from "react";
import {
  ChevronLeftIcon,
  DotsHorizontalIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../registry/default/components/ui/ButtonGroup";
import { Button } from "../registry/default/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../registry/default/components/ui/DropdownMenu";
import { Input } from "../registry/default/components/ui/Input";
import { Label } from "../registry/default/components/ui/Label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "../registry/default/components/ui/Select";

export const Default = () => {
  const [label, setLabel] = useState("personal");

  return (
    <div className="flex gap-2">
      <ButtonGroup aria-label="Go back">
        <Button variant="pill" size="icon-md" aria-label="Go Back">
          <ChevronLeftIcon className="icon" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Archive and report">
        <Button variant="pill">Archive</Button>
        <Button variant="pill">Report</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Snooze and more">
        <Button variant="pill">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="pill"
              size="icon-md"
              aria-label="More options"
            >
              <DotsHorizontalIcon className="icon" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Mark as Read</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Snooze</DropdownMenuItem>
              <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
              <DropdownMenuItem>Add to List</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Label As...</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={label}
                    onValueChange={setLabel}
                  >
                    <DropdownMenuRadioItem value="personal">
                      Personal
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">
                      Work
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem >
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
};

export const Vertical = () => (
  <ButtonGroup orientation="vertical" aria-label="Vertical button group">
    <Button variant="default">One</Button>
    <Button variant="default">Two</Button>
    <Button variant="default">Three</Button>
  </ButtonGroup>
);
