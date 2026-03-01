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
      pill: "button-pill border border-gray-6 text-gray-11 bg-gray-2 hover:bg-gray-3",
      link: "button-link",
      menu: "button-menu",
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
  isLoadingText?: string | React.ReactNode;
  mode?: VariantProps<typeof buttonVariants>["variant"];
  label?: string | React.ReactNode;
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
      
            {isLoading && isLoadingText ? isLoadingText : <>{label}{children}</>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
export default Button;
