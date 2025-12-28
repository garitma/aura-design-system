import { Toggle } from "@/components/ui/Toggle";
import {
  FontItalicIcon,
  HeartIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";

export const ToggleDemo = () => {
  return (
    <div className="flex items-center gap-2">
      <Toggle>
        <FontItalicIcon />
      </Toggle>
    </div>
  );
};

export const ToggleIconsDemo = () => {
  return (
    <Toggle className="group">
      <HeartIcon className="block group-data-[state=on]:hidden icon" />
      <HeartFilledIcon className="hidden group-data-[state=on]:block text-accent-9 icon" />
    </Toggle>
  );
};