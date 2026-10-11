"use client";

/**
 * @description Overlapping avatars with truncation, orientation, and custom overflow.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";

type AvatarGroupOrientation = "horizontal" | "vertical";
type AvatarGroupDirection = "ltr" | "rtl";
type AvatarGroupShape = "round" | "square";

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    direction: {
      ltr: "",
      rtl: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      direction: "ltr",
      className: "-space-x-1",
    },
    {
      orientation: "horizontal",
      direction: "rtl",
      className: "flex-row-reverse -space-x-1 space-x-reverse",
    },
    {
      orientation: "vertical",
      direction: "ltr",
      className: "-space-y-1",
    },
    {
      orientation: "vertical",
      direction: "rtl",
      className: "flex-col-reverse -space-y-1 space-y-reverse",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    direction: "ltr",
  },
});

/** Non-circle radii. `rounded-full` is the round avatar, not a square shape. */
const SQUARE_RADIUS =
  /(?:^|\s)rounded(?:-(?:none|sm|md|lg|xl|2xl|3xl))?(?=\s|$)/;

function stripCircle(className: string | undefined): string {
  return (className ?? "")
    .replace(/\brounded-full\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolvesToSquare(
  shape: AvatarGroupShape,
  childClassName?: string,
): boolean {
  if (shape === "square") return true;
  return SQUARE_RADIUS.test(stripCircle(childClassName));
}

function radiusClass(
  isSquare: boolean,
  childClassName?: string,
): string | undefined {
  if (!isSquare) return "rounded-full";
  if (SQUARE_RADIUS.test(stripCircle(childClassName))) return undefined;
  return "rounded-none";
}

function cutoutMaskImage(options: {
  isSquare: boolean;
  orientation: AvatarGroupOrientation;
  direction: AvatarGroupDirection;
  reverse: boolean;
  size: number;
  shouldMask: boolean;
}): string {
  if (!options.shouldMask) return "";

  const { isSquare, orientation, direction, reverse, size } = options;
  const maskRadius = size / 2;
  const maskOffset = size / 4 + size / 10;
  const cutsStart = reverse ? direction !== "ltr" : direction === "ltr";

  if (isSquare) {
    // Same midline depth as the circular bite, plus 2px, so squares overlap
    // instead of sitting edge to edge. A straight edge follows `rounded-none`
    // and the flat side of a `rounded-md` stack; outer corners stay on the avatar.
    const cut = `${Number((Math.max(maskRadius - maskOffset, 0) + 2).toFixed(2))}px`;
    if (orientation === "vertical") {
      return cutsStart
        ? `linear-gradient(to bottom, transparent ${cut}, white ${cut})`
        : `linear-gradient(to top, transparent ${cut}, white ${cut})`;
    }
    return cutsStart
      ? `linear-gradient(to right, transparent ${cut}, white ${cut})`
      : `linear-gradient(to left, transparent ${cut}, white ${cut})`;
  }

  if (orientation === "vertical") {
    if (direction === "ltr") {
      return reverse
        ? `radial-gradient(circle ${maskRadius}px at 50% ${size + maskOffset}px, transparent 99%, white 100%)`
        : `radial-gradient(circle ${maskRadius}px at 50% -${maskOffset}px, transparent 99%, white 100%)`;
    }
    return reverse
      ? `radial-gradient(circle ${maskRadius}px at 50% -${maskOffset}px, transparent 99%, white 100%)`
      : `radial-gradient(circle ${maskRadius}px at 50% ${size + maskOffset}px, transparent 99%, white 100%)`;
  }

  if (direction === "ltr") {
    return reverse
      ? `radial-gradient(circle ${maskRadius}px at ${size + maskOffset}px 50%, transparent 99%, white 100%)`
      : `radial-gradient(circle ${maskRadius}px at -${maskOffset}px 50%, transparent 99%, white 100%)`;
  }

  return reverse
    ? `radial-gradient(circle ${maskRadius}px at -${maskOffset}px 50%, transparent 99%, white 100%)`
    : `radial-gradient(circle ${maskRadius}px at ${size + maskOffset}px 50%, transparent 99%, white 100%)`;
}

interface AvatarGroupProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof avatarGroupVariants> {
  /** Pixel size applied to each item (default matches Aura `size-3` = 39px). */
  size?: number;
  /** Max visible slots including the overflow indicator when truncating. */
  max?: number;
  asChild?: boolean;
  reverse?: boolean;
  /**
   * Cutout shape. `round` (default) uses a circular mask. `square` uses a
   * straight mask and drops `rounded-full`, so `rounded-none` and `rounded-md`
   * avatars keep a gap. Square radii on a child are detected either way.
   */
  shape?: AvatarGroupShape;
  renderOverflow?: (count: number) => React.ReactNode;
}

function AvatarGroup(props: AvatarGroupProps) {
  const {
    orientation = "horizontal",
    direction = "ltr",
    size = 39,
    max,
    asChild,
    reverse = false,
    shape = "round",
    renderOverflow,
    className,
    children,
    ...rootProps
  } = props;

  const childrenArray = React.Children.toArray(children).filter(
    React.isValidElement,
  );
  const itemCount = childrenArray.length;
  const shouldTruncate = Boolean(max && itemCount > max);
  const visibleItems = shouldTruncate
    ? childrenArray.slice(0, (max as number) - 1)
    : childrenArray;
  const overflowCount = shouldTruncate ? itemCount - ((max as number) - 1) : 0;
  const totalRenderedItems = shouldTruncate ? (max as number) : itemCount;
  const overflowIsSquare = shape === "square";

  const RootPrimitive = asChild ? Slot : "div";

  return (
    <RootPrimitive
      data-orientation={orientation}
      data-direction={direction}
      data-shape={shape}
      data-slot="avatar-group"
      {...rootProps}
      className={cn(
        avatarGroupVariants({ orientation, direction }),
        className,
      )}
    >
      {visibleItems.map((child, index) => (
        <AvatarGroupItem
          key={index}
          child={child}
          index={index}
          itemCount={totalRenderedItems}
          orientation={orientation}
          direction={direction}
          size={size}
          reverse={reverse}
          shape={shape}
        />
      ))}
      {shouldTruncate ? (
        <AvatarGroupItem
          key="overflow"
          child={
            renderOverflow ? (
              renderOverflow(overflowCount)
            ) : (
              <div
                className={cn(
                  "small inline-flex size-full items-center justify-center bg-gray-3 text-gray-11",
                  overflowIsSquare ? "rounded-none" : "rounded-full",
                )}
              >
                +{overflowCount}
              </div>
            )
          }
          index={visibleItems.length}
          itemCount={totalRenderedItems}
          orientation={orientation}
          direction={direction}
          size={size}
          reverse={reverse}
          shape={shape}
        />
      ) : null}
    </RootPrimitive>
  );
}

interface AvatarGroupItemProps {
  child: React.ReactNode;
  index: number;
  itemCount: number;
  size: number;
  reverse: boolean;
  orientation: AvatarGroupOrientation;
  direction: AvatarGroupDirection;
  shape: AvatarGroupShape;
  className?: string;
  style?: React.CSSProperties;
}

function AvatarGroupItem(props: AvatarGroupItemProps) {
  const {
    child,
    index,
    size,
    orientation,
    direction = "ltr",
    reverse = false,
    shape = "round",
    itemCount,
    className,
    style,
  } = props;

  if (!React.isValidElement<{ className?: string; style?: React.CSSProperties; "data-slot"?: string }>(child)) {
    return child;
  }

  const isSquare = resolvesToSquare(shape, child.props.className);
  const shouldMask =
    orientation === "vertical" && direction === "rtl" && reverse
      ? index !== itemCount - 1
      : reverse
        ? index < itemCount - 1
        : index > 0;

  const maskImage = cutoutMaskImage({
    isSquare,
    orientation,
    direction,
    reverse,
    size,
    shouldMask,
  });

  const maskStyle: React.CSSProperties = {
    width: size,
    height: size,
    maskImage,
    WebkitMaskImage: maskImage,
  };

  return React.cloneElement(child, {
    ...(child.props["data-slot"]
      ? {}
      : { "data-slot": "avatar-group-item" }),
    className: cn(
      "size-full shrink-0 overflow-hidden [&_img]:size-full",
      radiusClass(isSquare, child.props.className),
      isSquare ? stripCircle(child.props.className) : child.props.className,
      className,
    ),
    style: {
      ...maskStyle,
      ...style,
      ...child.props.style,
    },
  });
}

export { AvatarGroup, avatarGroupVariants };
export type { AvatarGroupProps };
