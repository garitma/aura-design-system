import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

export const AvatarDemo = () => (
  <div className="flex gap-1">
    <Avatar className="inline-flex size-2 items-center justify-center overflow-hidden rounded-full">
      <AvatarImage
        className="size-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <AvatarFallback
        className="flex size-full items-center justify-center bg-gray-1"
        delayMs={600}
      >
        CT
      </AvatarFallback>
    </Avatar>
    <Avatar className="inline-flex size-2 items-center justify-center overflow-hidden rounded-full">
      <AvatarImage
        className="size-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <AvatarFallback
        className="flex size-full items-center justify-center bg-gray-1"
        delayMs={600}
      >
        CT
      </AvatarFallback>
    </Avatar>
    <Avatar className="inline-flex size-2 items-center justify-center overflow-hidden rounded-full">
      <AvatarImage
        className="size-full rounded-[inherit] object-cover"
        alt="Colm Tuite"
      />
      <AvatarFallback
        className="flex size-full items-center justify-center bg-gray-5"
        delayMs={600}
      >
        CT
      </AvatarFallback>
    </Avatar>
  </div>
);
