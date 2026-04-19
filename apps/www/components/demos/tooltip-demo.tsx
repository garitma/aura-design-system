import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";

export const TooltipDemo = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="pill">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      This is a tooltip
    </TooltipContent>
  </Tooltip>
)