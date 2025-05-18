"use client";

import * as React from "react";
import { Avatar as AvatarRadix } from "radix-ui";

function Avatar({ ...props }: React.ComponentProps<typeof AvatarRadix.Root>) {
  return <AvatarRadix.Root data-slot="avatar" {...props} />;
}

function AvatarImage({
  ...props
}: React.ComponentProps<typeof AvatarRadix.Image>) {
  return <AvatarRadix.Image data-slot="avatar-image" {...props} />;
}

function AvatarFallback({
  ...props
}: React.ComponentProps<typeof AvatarRadix.Fallback>) {
  return <AvatarRadix.Fallback data-slot="avatar-fallback" {...props} />;
}

export { Avatar, AvatarImage, AvatarFallback };
