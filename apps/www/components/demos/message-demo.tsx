import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar";
import { Bubble, BubbleContent } from "@/components/ui/Bubble";
import { Button } from "@/components/ui/Button";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/components/ui/Marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/Message";
import { SymbolIcon } from "@radix-ui/react-icons";

export const MessageDemo = () => (
  <div className="flex w-full max-w-lg flex-col gap-2">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
        <MessageFooter>Delivered</MessageFooter>
      </MessageContent>
    </Message>
    <Message>
      <Marker role="status">
        <MarkerIcon>
          <SymbolIcon className="icon animate-spin" />
        </MarkerIcon>
        <MarkerContent>Oliver is typing...</MarkerContent>
      </Marker>
    </Message>
  </div>
)

export const MessageDemoAlignment = () => (
  <div className="flex w-full max-w-lg flex-col gap-2">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>The build failed during dependency installation.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>Can you share the exact error?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>
            Something went wrong with the build. Try running it again.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
)

export const MessageDemoGroup = () => (
  <div className="flex w-full max-w-lg flex-col gap-2">
    <MessageGroup>
      <Message>
        <MessageAvatar className="invisible" aria-hidden />
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>I checked the registry addresses.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>They look correct on my end.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  </div>
)

export const MessageDemoHeaderAndFooter = () => (
  <div className="flex w-full max-w-lg flex-col gap-2">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>You</MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent>
            Send the report to the team. Ping @shadcn if you need help.
          </BubbleContent>
        </Bubble>
        <MessageFooter>Just now</MessageFooter>
      </MessageContent>
    </Message>
  </div>
)

export const MessageDemoActions = () => (
  <div className="flex w-full max-w-lg flex-col gap-2">
    <Message>
      <MessageContent>
        <Bubble variant="ghost">
          <BubbleContent>
            The install failure is coming from the workspace package.
          </BubbleContent>
        </Bubble>
        <MessageFooter className="gap-0.5">
          <Button variant="pill" size="xs" type="button" aria-label="Copy">
            Copy
          </Button>
          <Button variant="pill" size="xs" type="button" aria-label="Retry">
            Retry
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
)