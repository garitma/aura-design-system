import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/Avatar";
import { AvatarGroup as AvatarGroupRoot } from "@/components/ui/AvatarGroup";

export const AvatarDemo = () => (
  <Avatar>
    <AvatarImage
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
      alt="User avatar"
    />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
)

export const AvatarDemoWithFallback = () => (
  <Avatar>
    <AvatarImage src="invalid-url.jpg" alt="User avatar" />
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
)

export const AvatarDemoFallbackOnly = () => (
  <Avatar>
    <AvatarFallback>CD</AvatarFallback>
  </Avatar>
)

export const AvatarDemoCustomSize = () => (
  <div className="flex gap-4 items-center">
    <Avatar className="size-8">
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Small avatar"
      />
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
    <Avatar className="size-12">
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Medium avatar"
      />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
    <Avatar className="size-16">
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Large avatar"
      />
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  </div>
)

export const AvatarGroupDemo = () => (
  <AvatarGroupRoot max={4}>
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="User 1"
      />
      <AvatarFallback>U1</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
        alt="User 2"
      />
      <AvatarFallback>U2</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop"
        alt="User 3"
      />
      <AvatarFallback>U3</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>U4</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>U5</AvatarFallback>
    </Avatar>
  </AvatarGroupRoot>
)

export const AvatarDemoWithStatus = () => (
  <div className="flex gap-4 items-center">
    <div className="relative">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
          alt="Online user"
        />
        <AvatarFallback>ON</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 block size-1 rounded-full bg-green-500 ring-2 ring-white" />
    </div>
    <div className="relative">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
          alt="Away user"
        />
        <AvatarFallback>AW</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 block size-1 rounded-full bg-yellow-500 ring-2 ring-white" />
    </div>
    <div className="relative">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop"
          alt="Offline user"
        />
        <AvatarFallback>OF</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 block size-1 rounded-full bg-gray-400 ring-2 ring-white" />
    </div>
  </div>
)

export const AvatarDemoDifferentShapes = () => (
  <div className="flex gap-4 items-center">
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Round avatar"
      />
      <AvatarFallback>RD</AvatarFallback>
    </Avatar>
    <Avatar className="rounded-md">
      <AvatarImage
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
        alt="Rounded avatar"
      />
      <AvatarFallback>SQ</AvatarFallback>
    </Avatar>
    <Avatar className="rounded-none">
      <AvatarImage
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop"
        alt="Square avatar"
      />
      <AvatarFallback>BX</AvatarFallback>
    </Avatar>
  </div>
)

export const AvatarDemoCustomFallbackStyles = () => (
  <div className="flex gap-4 items-center">
    <Avatar>
      <AvatarFallback className="bg-accent-9 text-white">AC</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback className="bg-gradient-to-br from-accent-9 to-accent-11 text-white">
        GR
      </AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback className="bg-gray-9 text-white font-bold">
        BL
      </AvatarFallback>
    </Avatar>
  </div>
)