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
        icon: "w-3 h-3 p-0",
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

    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant: effectiveVariant, size, className }),
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

export { Button, buttonVariants };
export type { ButtonProps };
export default Button;
