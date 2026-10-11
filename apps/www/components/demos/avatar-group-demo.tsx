import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar";
import { AvatarGroup } from "@/components/ui/AvatarGroup";

const people = [
  {
    src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
    alt: "Colm Tuite",
    fallback: "CT",
  },
  {
    src: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?&w=128&h=128&dpr=2&q=80",
    alt: "Pedro Duarte",
    fallback: "PD",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=128&h=128&dpr=2&q=80",
    alt: "Zara Ahmed",
    fallback: "ZA",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=128&h=128&dpr=2&q=80",
    alt: "John Doe",
    fallback: "JD",
  },
  {
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?&w=128&h=128&dpr=2&q=80",
    alt: "Alex Rivera",
    fallback: "AR",
  },
] as const;

function PersonAvatar({
  person,
  className,
}: {
  person: (typeof people)[number];
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={person.src} alt={person.alt} />
      <AvatarFallback>{person.fallback}</AvatarFallback>
    </Avatar>
  );
}



export const AvatarGroupDemo = () => (
  <AvatarGroup>
    {people.slice(0, 3).map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
)

export const AvatarGroupDemoWithTruncation = () => (
  <AvatarGroup max={4}>
    {people.map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
)

export const AvatarGroupDemoVertical = () => (
  <AvatarGroup orientation="vertical">
    {people.slice(0, 3).map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
)

export const AvatarGroupDemoRtl = () => (
  <div className="flex flex-col gap-4">
    <AvatarGroup direction="rtl">
      {people.slice(0, 4).map((person) => (
        <PersonAvatar key={person.fallback} person={person} />
      ))}
    </AvatarGroup>
    <AvatarGroup orientation="vertical" direction="rtl">
      {people.slice(0, 3).map((person) => (
        <PersonAvatar key={person.fallback} person={person} />
      ))}
    </AvatarGroup>
  </div>
)

export const AvatarGroupDemoCustomOverflow = () => (
  <AvatarGroup
    max={3}
    renderOverflow={(count) => (
      <div className="small inline-flex size-full items-center justify-center rounded-full bg-accent-9 text-accent-contrast">
        +{count}
      </div>
    )}
  >
    {people.map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
)

export const AvatarGroupDemoReverse = () => (
  <div className="flex flex-col gap-4">
    <AvatarGroup reverse>
      {people.slice(0, 4).map((person) => (
        <PersonAvatar key={person.fallback} person={person} />
      ))}
    </AvatarGroup>
    <AvatarGroup orientation="vertical" reverse>
      {people.slice(0, 3).map((person) => (
        <PersonAvatar key={person.fallback} person={person} />
      ))}
    </AvatarGroup>
  </div>
)

export const AvatarGroupDemoSquare = () => (
  <div className="flex flex-col gap-4">
    <AvatarGroup shape="square" max={4}>
      {people.map((person) => (
        <PersonAvatar
          key={person.fallback}
          person={person}
          className="rounded-none"
        />
      ))}
    </AvatarGroup>
    <AvatarGroup shape="square">
      {people.slice(0, 3).map((person) => (
        <PersonAvatar
          key={person.fallback}
          person={person}
          className="rounded-md"
        />
      ))}
    </AvatarGroup>
  </div>
)

export const AvatarGroupDemoWithIcons = () => (
  <AvatarGroup size={39}>
    <Avatar>
      <AvatarFallback className="bg-accent-3 text-accent-11">A</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback className="bg-gray-4 text-gray-12">B</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback className="bg-info text-info-contrast">C</AvatarFallback>
    </Avatar>
  </AvatarGroup>
)