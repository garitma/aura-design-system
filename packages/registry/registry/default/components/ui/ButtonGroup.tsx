import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/class-names"
import { Button, type ButtonProps } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"

/**
 * `default` maps child buttons to `md` / `icon-md` (52px).
 * `sm` maps them to `sm` / `icon-sm` (39px). `icon` is the same 39px control.
 *
 * Size is cloned onto direct `Button` and `ButtonGroupText` children.
 * `Button` stays free of `createContext`, which React's server build does not export.
 */
type ButtonGroupSize = "default" | "sm"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

const groupSizeWarnings = new Set<string>()

function warnOnce(message: string) {
  if (process.env.NODE_ENV === "production") return
  if (groupSizeWarnings.has(message)) return
  groupSizeWarnings.add(message)
  console.warn(message)
}

function visibleContent(props: {
  label?: React.ReactNode
  children?: React.ReactNode
}) {
  const hasLabel = props.label != null && props.label !== false
  const hasChildren = props.children != null && props.children !== false
  if (hasLabel && hasChildren) return props.children
  return hasChildren ? props.children : props.label
}

function isIconOnlyContent(node: React.ReactNode): boolean {
  const items = React.Children.toArray(node).filter(
    (child) => child !== null && child !== undefined && child !== false && child !== "",
  )
  if (items.length === 0) return false
  return items.every((child) => {
    if (typeof child === "string" || typeof child === "number") return false
    if (!React.isValidElement(child)) return false
    if (typeof child.type === "string" && (child.type === "svg" || child.type === "img")) {
      return true
    }
    const className = (child.props as { className?: unknown }).className
    return typeof className === "string" && className.split(/\s+/).includes("icon")
  })
}

function applyGroupSize(
  children: React.ReactNode,
  size: ButtonGroupSize,
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child

    if (child.type === React.Fragment) {
      const fragmentProps = child.props as { children?: React.ReactNode }
      return React.cloneElement(
        child,
        {},
        applyGroupSize(fragmentProps.children, size),
      )
    }

    if (child.type === ButtonGroupText) {
      const textProps = child.props as { size?: ButtonGroupSize }
      if (textProps.size != null) return child
      return React.cloneElement(child, { size })
    }

    if (child.type === Button) {
      const buttonProps = child.props as ButtonProps
      if (buttonProps.size != null) return child
      const iconOnly = isIconOnlyContent(
        buttonProps.asChild ? null : visibleContent(buttonProps),
      )
      const nextSize = iconOnly
        ? size === "sm"
          ? "icon-sm"
          : "icon-md"
        : size === "sm"
          ? "sm"
          : "md"
      if (iconOnly && !buttonProps["aria-label"] && !buttonProps["aria-labelledby"]) {
        warnOnce(
          "Button: an icon-only button in a ButtonGroup needs an aria-label.",
        )
      }
      return React.cloneElement(child, { size: nextSize })
    }

    return child
  })
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  size = "default",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants> & {
    size?: ButtonGroupSize
  }) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-size={size}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    >
      {applyGroupSize(children, size)}
    </div>
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  size,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
  size?: ButtonGroupSize
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        "flex items-center gap-0.5 rounded-sm border border-gray-6 bg-gray-2 px-2 font-medium [&_svg]:pointer-events-none",
        size === "sm" ? "h-3" : "h-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative !m-0 self-stretch bg-gray-6 data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
export type { ButtonGroupSize }
