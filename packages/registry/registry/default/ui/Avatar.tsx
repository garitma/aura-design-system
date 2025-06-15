"use client";

import * as React from "react";
import { Avatar as AvatarRadix } from "radix-ui";
import { cn } from "@/utils/class-names";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarRadix.Root>) {
  return (
    <AvatarRadix.Root
      data-slot="avatar"
      className={cn(
        className,
        "inline-flex size-3 items-center justify-center overflow-hidden rounded-full"
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
      className={cn(className, "size-full rounded-[inherit] object-cover")}
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
        className,
        "flex size-full items-center justify-center bg-gray-3"
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
