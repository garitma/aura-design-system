import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../registry/default/components/ui/Bubble";

export const Default = () => (
  <div className="flex w-full max-w-md flex-col gap-2">
    <Bubble variant="secondary">
      <BubbleContent>Hey there! What&apos;s up?</BubbleContent>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
    </Bubble>
    <Bubble variant="secondary">
      <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
      <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
        <span>👍</span>
        <span>🔥</span>
        <span>👀</span>
        <span>+2</span>
      </BubbleReactions>
    </Bubble>
  </div>
);

export const Variants = () => (
  <div className="flex w-full max-w-md flex-col gap-2 py-2">
    <Bubble variant="default" align="end">
      <BubbleContent>This is the default primary bubble.</BubbleContent>
    </Bubble>
    <Bubble variant="secondary">
      <BubbleContent>This is the secondary variant.</BubbleContent>
    </Bubble>
    <Bubble variant="muted">
      <BubbleContent>This one is muted for quieter supporting content.</BubbleContent>
    </Bubble>
    <Bubble variant="tinted">
      <BubbleContent>This one is tinted from the accent scale.</BubbleContent>
    </Bubble>
    <Bubble variant="outline">
      <BubbleContent>Outlined bubble for secondary or rich content.</BubbleContent>
    </Bubble>
    <Bubble variant="destructive">
      <BubbleContent>Destructive bubble for errors or failed actions.</BubbleContent>
      <BubbleReactions role="img" aria-label="Reactions: fire">
        <span>🔥</span>
      </BubbleReactions>
    </Bubble>
    <Bubble variant="ghost">
      <BubbleContent>
        Ghost bubbles work for assistant text and content that should not be
        framed.
      </BubbleContent>
    </Bubble>
  </div>
);

export const Alignment = () => (
  <div className="flex w-full max-w-md flex-col gap-2">
    <Bubble variant="secondary" align="start">
      <BubbleContent>
        Aligned to the start. This is the default alignment.
      </BubbleContent>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>Aligned to the end. Use this for user messages.</BubbleContent>
    </Bubble>
  </div>
);

export const Group = () => (
  <div className="flex w-full max-w-md flex-col gap-3">
    <BubbleGroup>
      <Bubble variant="secondary">
        <BubbleContent>Can you tell me what&apos;s the issue?</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>You tell me!</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Find the bug and fix it. 👀</BubbleContent>
      </Bubble>
    </BubbleGroup>
    <BubbleGroup>
      <Bubble variant="default" align="end">
        <BubbleContent>
          Want me to diff yesterday&apos;s you against today&apos;s you? It&apos;s
          a bit embarrassing.
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  </div>
);

export const AsLink = () => (
  <div className="flex w-full max-w-md flex-col gap-2">
    <Bubble variant="muted">
      <BubbleContent asChild>
        <a href="#help">How can I help you today?</a>
      </BubbleContent>
    </Bubble>
    <Bubble variant="muted" align="end">
      <BubbleContent asChild>
        <button type="button">Click here</button>
      </BubbleContent>
    </Bubble>
  </div>
);

export const Reactions = () => (
  <div className="flex w-full max-w-md flex-col gap-3 py-2">
    <Bubble variant="secondary">
      <BubbleContent>
        Tests passed on the first try. All 142 of them. Looking good!
      </BubbleContent>
      <BubbleReactions
        side="bottom"
        align="end"
        role="img"
        aria-label="Reactions: thumbs up, party, and 8 more"
      >
        <span>👍</span>
        <span>🎉</span>
        <span>+8</span>
      </BubbleReactions>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>Ship it.</BubbleContent>
      <BubbleReactions
        side="top"
        align="start"
        role="img"
        aria-label="Reactions: rocket"
      >
        <span>🚀</span>
      </BubbleReactions>
    </Bubble>
  </div>
);
