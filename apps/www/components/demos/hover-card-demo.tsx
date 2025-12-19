import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/HoverCard";
import { Button } from "@/components/ui/Button";
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar";
import { CalendarIcon } from "@radix-ui/react-icons";

export const HoverCardDemo = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="link">Hover me</Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">Hover Card</h4>
        <p className="text-sm text-gray-11">
          This is a simple hover card example.
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export const HoverCardDemoProfilePreview = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="link">Hover me</Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-20">
      <div className="flex justify-between space-x-0.5 items-start">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-semibold">shadcn</h4>
          <p className="text-sm">
            Designed and built with all the love in the world by @shadcn.
          </p>
          <div className="flex items-center pt-1">
            <CalendarIcon className="mr-2 icon" />{" "}
            <span className="text-xs text-gray-11">Joined December 2021</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);