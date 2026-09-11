"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
} from "../registry/default/components/ui/Avatar";
import { Bubble, BubbleContent } from "../registry/default/components/ui/Bubble";
import { Button } from "../registry/default/components/ui/Button";
import {
  Marker,
  MarkerContent,
} from "../registry/default/components/ui/Marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "../registry/default/components/ui/Message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "../registry/default/components/ui/MessageScroller";

type DemoMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const seed: DemoMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Morning! What are we working on today?",
  },
  {
    id: "2",
    role: "user",
    content:
      "I'm building a chat for our app and the scroll behavior is driving me nuts.",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Streaming breaks the old inverted-list model. Preserve the reader's place while the conversation keeps changing.",
  },
  {
    id: "4",
    role: "user",
    content: "Can MessageScroller anchor each new turn near the top?",
  },
  {
    id: "5",
    role: "assistant",
    content:
      "Yes. Mark the turn-starting row with scrollAnchor. The viewport peeks the previous item and streams the reply below.",
  },
  {
    id: "6",
    role: "system",
    content: "Conversation checkpoint",
  },
  {
    id: "7",
    role: "user",
    content: "What if I scroll away while the answer is still streaming?",
  },
  {
    id: "8",
    role: "assistant",
    content:
      "Auto-follow only while you're at the live edge. Scroll away and it leaves you there until you jump back.",
  },
];

function JumpControls({ messageIds }: { messageIds: string[] }) {
  const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller();

  return (
    <div className="flex flex-wrap gap-0.5 border-b border-gray-6 p-1">
      <Button
        variant="pill"
        size="xs"
        type="button"
        onClick={() => scrollToStart()}
      >
        Start
      </Button>
      <Button
        variant="pill"
        size="xs"
        type="button"
        onClick={() => scrollToEnd()}
      >
        Latest
      </Button>
      {messageIds.slice(0, 4).map((id) => (
        <Button
          key={id}
          variant="pill"
          size="xs"
          type="button"
          onClick={() => scrollToMessage(id)}
        >
          #{id}
        </Button>
      ))}
    </div>
  );
}

function Transcript({
  messages,
  onSend,
}: {
  messages: DemoMessage[];
  onSend: () => void;
}) {
  return (
    <div className="flex h-[28rem] w-full max-w-lg flex-col overflow-hidden rounded-md border border-gray-6 bg-gray-1">
      <MessageScrollerProvider defaultScrollPosition="end">
        <JumpControls messageIds={messages.map((m) => m.id)} />
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-1 p-1">
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor={message.role === "user"}
                >
                  {message.role === "system" ? (
                    <Marker variant="separator">
                      <MarkerContent>{message.content}</MarkerContent>
                    </Marker>
                  ) : (
                    <Message align={message.role === "user" ? "end" : "start"}>
                      {message.role === "assistant" ? (
                        <MessageAvatar>
                          <Avatar>
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                      ) : null}
                      <MessageContent>
                        <Bubble
                          variant={
                            message.role === "user" ? "default" : "secondary"
                          }
                          align={message.role === "user" ? "end" : "start"}
                        >
                          <BubbleContent>{message.content}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  )}
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <div className="border-t border-gray-6 p-1">
        <Button variant="fill" size="sm" type="button" onClick={onSend}>
          Send next turn
        </Button>
      </div>
    </div>
  );
}

export const Default = () => {
  const [messages, setMessages] = React.useState(seed);

  return (
    <Transcript
      messages={messages}
      onSend={() => {
        const next = messages.length + 1;
        setMessages((prev) => [
          ...prev,
          {
            id: String(next),
            role: "user",
            content: `Follow-up #${next}: keep my place while this streams.`,
          },
          {
            id: String(next + 1),
            role: "assistant",
            content:
              "Anchored your turn near the top. New content can grow below without yanking the viewport unless you are following.",
          },
        ]);
      }}
    />
  );
};

export const AnchoredTurns = () => {
  const messages: DemoMessage[] = [
    {
      id: "a1",
      role: "user",
      content: "Anchor this user turn near the top.",
    },
    {
      id: "a2",
      role: "assistant",
      content:
        "The reply streams under the anchored prompt so the exchange stays connected.",
    },
    {
      id: "a3",
      role: "user",
      content: "Send another turn to see the next anchor settle.",
    },
    {
      id: "a4",
      role: "assistant",
      content: "Each user row with scrollAnchor becomes the start of a turn.",
    },
  ];

  return (
    <div className="flex h-[24rem] w-full max-w-lg flex-col overflow-hidden rounded-md border border-gray-6 bg-gray-1">
      <MessageScrollerProvider defaultScrollPosition="last-anchor">
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-1 p-1">
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor={message.role === "user"}
                >
                  <Message align={message.role === "user" ? "end" : "start"}>
                    <MessageContent>
                      <Bubble
                        variant={
                          message.role === "user" ? "default" : "secondary"
                        }
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <BubbleContent>{message.content}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="start" />
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
};
