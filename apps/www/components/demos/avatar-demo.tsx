import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/Avatar";
import { StatusDot } from "@/components/ui/StatusDot";

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
    <Avatar size="sm">
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Small avatar"
      />
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Default avatar"
      />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
        alt="Large avatar"
      />
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  </div>
)

export const AvatarDemoWithStatus = () => (
  <div className="flex gap-4 items-center">
    <div className="relative">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
          alt="Ready user"
        />
        <AvatarFallback>ON</AvatarFallback>
      </Avatar>
      <StatusDot state="ready" ring className="absolute bottom-0 right-0" />
    </div>
    <div className="relative">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
          alt="Building user"
        />
        <AvatarFallback>AW</AvatarFallback>
      </Avatar>
      <StatusDot state="building" ring className="absolute bottom-0 right-0" />
    </div>
    <div className="relative">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop"
          alt="Canceled user"
        />
        <AvatarFallback>OF</AvatarFallback>
      </Avatar>
      <StatusDot state="canceled" ring className="absolute bottom-0 right-0" />
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
