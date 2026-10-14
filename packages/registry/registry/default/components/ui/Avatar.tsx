"use client";
import * as React from "react";
import { Avatar as AvatarRadix } from "radix-ui";
import { cn } from "@/utils/class-names";

const avatarSizes = {
  sm: "size-2",
  default: "size-3",
  lg: "size-4",
} as const;

type AvatarSize = keyof typeof avatarSizes;

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarRadix.Root> & {
  size?: AvatarSize;
}) {
  return (
    <AvatarRadix.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full",
        avatarSizes[size],
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarRadix.Image>) {
  return (
    <AvatarRadix.Image
      data-slot="avatar-image"
      className={cn("size-full rounded-[inherit] object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarRadix.Fallback>) {
  return (
    <AvatarRadix.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center bg-gray-3 h6",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, type AvatarSize };

