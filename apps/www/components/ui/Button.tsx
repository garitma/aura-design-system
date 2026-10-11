/**
 * @description Displays a button or a component that looks like a button.
 *
 * `mode` is a deprecated alias of `variant`. `variant="default"` is a
 * deprecated alias of `fill`. Both still render and warn in development.
 * Disabled chrome (opacity and cursor) lives only in `.button:disabled`.
 * Loading sets `disabled` so the control stays non-interactive, and
 * `data-loading` so it does not fade to the disabled opacity.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/class-names";
import { Spinner } from "@/components/ui/Spinner";

/** Provided by ButtonGroup. `null` when a button is not grouped. */
const ButtonGroupContext = React.createContext<"default" | "sm" | null>(null);

const buttonVariants = cva(
  "button focus-visible:[outline:var(--aura-outline)] [&_svg]:size-[1em]",
  {
    variants: {
      variant: {
        default: "button-fill",
        fill: "button-fill",
        pill: "button-pill border border-gray-6 text-gray-11 bg-gray-2 hover:bg-gray-3",
        link: "button-link",
        menu: "button-menu",
        split: "button-fill button-split-action",
        splitMenu: "button-fill button-split-menu",
      },
      size: {
        default: "h-4",
        xs: "h-2.5",
        sm: "h-3",
        md: "h-4",
        lg: "h-5",
        xl: "h-6",
        // `icon` and `icon-sm` are the 39px (3 × 13px) icon button. `icon-md` is 52px.
        icon: "w-3 h-3 p-0",
        "icon-sm": "w-3 h-3 p-0",
        "icon-md": "w-4 h-4 p-0",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isLoadingText?: string | React.ReactNode;
  /** @deprecated Use `variant`. Still applied, and warns in development. */
  mode?: VariantProps<typeof buttonVariants>["variant"];
  label?: string | React.ReactNode;
}

const deprecationWarnings = new Set<string>();

function warnOnce(message: string) {
  if (process.env.NODE_ENV === "production") return;
  if (deprecationWarnings.has(message)) return;
  deprecationWarnings.add(message);
  console.warn(message);
}

function resolveButtonContent(
  label: React.ReactNode,
  children: React.ReactNode,
): React.ReactNode {
  const hasLabel = label != null && label !== false;
  const hasChildren = children != null && children !== false;
  if (hasLabel && hasChildren) {
    warnOnce(
      "Button: `label` and `children` both set the visible text. Pass one. `children` is shown.",
    );
    return children;
  }
  return hasChildren ? children : label;
}

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const ICON_BUTTON_SIZES = new Set<ButtonSize>(["icon", "icon-sm", "icon-md"]);

function isIconOnlyContent(node: React.ReactNode): boolean {
  const items = React.Children.toArray(node).filter(
    (child) => child !== null && child !== undefined && child !== false && child !== "",
  );
  if (items.length === 0) return false;
  return items.every((child) => {
    if (typeof child === "string" || typeof child === "number") return false;
    if (!React.isValidElement(child)) return false;
    if (typeof child.type === "string" && (child.type === "svg" || child.type === "img")) {
      return true;
    }
    const className = (child.props as { className?: unknown }).className;
    return typeof className === "string" && className.split(/\s+/).includes("icon");
  });
}

function resolveGroupedSize(
  size: ButtonSize | null | undefined,
  groupSize: "default" | "sm" | null,
  iconOnly: boolean,
): ButtonSize | null | undefined {
  if (!groupSize || size) return size;
  if (iconOnly) return groupSize === "sm" ? "icon-sm" : "icon-md";
  return groupSize === "sm" ? "sm" : "md";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      className,
      variant,
      mode,
      size,
      asChild = false,
      isDisabled,
      isLoading,
      isLoadingText,
      children,
      label,
      disabled: disabledProp,
      ...rest
    } = props;
    const Comp = asChild ? Slot : "button";
    const explicitlyDisabled = Boolean(isDisabled || disabledProp);
    const loading = Boolean(isLoading);
    const nonInteractive = explicitlyDisabled || loading;
    const effectiveVariant = variant ?? mode;

    if (mode !== undefined) {
      warnOnce(
        "Button: `mode` is deprecated and duplicates `variant`. Pass `variant` instead. `mode` still works.",
      );
    }
    if (variant === "default" || mode === "default") {
      warnOnce(
        'Button: variant "default" is deprecated and matches "fill". Pass `variant="fill"`. "default" still works.',
      );
    }

    const content = resolveButtonContent(label, children);
    const groupSize = React.useContext(ButtonGroupContext);
    const iconOnly = isIconOnlyContent(asChild ? null : content);
    const resolvedSize = resolveGroupedSize(size, groupSize, iconOnly);

    if (
      groupSize &&
      (iconOnly || (resolvedSize != null && ICON_BUTTON_SIZES.has(resolvedSize))) &&
      !rest["aria-label"] &&
      !rest["aria-labelledby"]
    ) {
      warnOnce(
        "Button: an icon-only button in a ButtonGroup needs an aria-label.",
      );
    }

    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant: effectiveVariant, size: resolvedSize, className }),
        )}
        ref={ref}
        {...rest}
        data-loading={loading && !explicitlyDisabled ? true : undefined}
        aria-busy={loading ? true : undefined}
        disabled={nonInteractive}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading && isLoadingText ? (
              isLoadingText
            ) : (
              <>
                {isLoading ? <Spinner /> : null}
                {content}
              </>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, ButtonGroupContext, buttonVariants };
export type { ButtonProps };
export default Button;
