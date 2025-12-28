import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../registry/default/components/ui/Tooltip";
import { Button } from "../registry/default/components/ui/Button";

export const Default = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="pill">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
);

