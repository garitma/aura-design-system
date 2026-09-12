import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../registry/default/components/ui/Avatar";
import { AvatarGroup } from "../registry/default/components/ui/AvatarGroup";

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
}: {
  person: (typeof people)[number];
}) {
  return (
    <Avatar>
      <AvatarImage src={person.src} alt={person.alt} />
      <AvatarFallback>{person.fallback}</AvatarFallback>
    </Avatar>
  );
}

export const Default = () => (
  <AvatarGroup>
    {people.slice(0, 3).map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
);

export const WithTruncation = () => (
  <AvatarGroup max={4}>
    {people.map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
);

export const Vertical = () => (
  <AvatarGroup orientation="vertical">
    {people.slice(0, 3).map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
);

export const Rtl = () => (
  <div className="flex flex-col gap-4">
    <AvatarGroup dir="rtl">
      {people.slice(0, 4).map((person) => (
        <PersonAvatar key={person.fallback} person={person} />
      ))}
    </AvatarGroup>
    <AvatarGroup orientation="vertical" dir="rtl">
      {people.slice(0, 3).map((person) => (
        <PersonAvatar key={person.fallback} person={person} />
      ))}
    </AvatarGroup>
  </div>
);

export const CustomOverflow = () => (
  <AvatarGroup
    max={3}
    renderOverflow={(count) => (
      <div className="inline-flex size-full items-center justify-center rounded-full bg-accent-9 text-xs font-medium text-accent-contrast">
        +{count}
      </div>
    )}
  >
    {people.map((person) => (
      <PersonAvatar key={person.fallback} person={person} />
    ))}
  </AvatarGroup>
);

export const WithIcons = () => (
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
);
