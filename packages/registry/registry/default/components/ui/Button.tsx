/**
 * @description Displays a button or a component that looks like a button.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/class-names";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button-fill",
      fill: "button-fill",
      pill: "button-pill border border-gray-6 text-gray-11 hover:bg-gray-2",
      link: "button-link",
      menu: "button-menu",
    },
    size: {
      default: "h-4 px-2.5",
      xs: "h-2.5 px-1.5",
      sm: "h-3 px-2",
      md: "h-4 px-2.5",
      lg: "h-5 px-3",
      xl: "h-6 px-3.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  mode?: VariantProps<typeof buttonVariants>["variant"];
}

import { ReloadIcon } from "@radix-ui/react-icons";

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
      children,
      ...rest
    } = props;
    const Comp = asChild ? Slot : "button";
    const disabled = isDisabled || isLoading || props.disabled;
    const effectiveVariant = variant ?? mode;

    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant: effectiveVariant, size, className }),
          disabled && "opacity-50 cursor-not-allowed"
        )}
        ref={ref}
        disabled={disabled}
        {...rest}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading && <ReloadIcon className="mr-0.5 icon animate-spin" />}
            {children}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
