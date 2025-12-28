import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

export const ToggleGroupDemo = () => (
  <ToggleGroup
    type="single"
    defaultValue="center"
    aria-label="Text alignment"
  >
    <ToggleGroupItem
      value="left"
      aria-label="Left aligned"
    >
      <TextAlignLeftIcon />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="center"
      aria-label="Center aligned"
    >
      <TextAlignCenterIcon />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="right"
      aria-label="Right aligned"
    >
      <TextAlignRightIcon />
    </ToggleGroupItem>
  </ToggleGroup>
)