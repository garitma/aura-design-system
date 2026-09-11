"use client";

/**
 * @description Add addons, buttons, and helper content to inputs.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-4 w-full min-w-0 items-center rounded-sm border border-gray-a6 bg-gray-2 transition-colors outline-none",
        "has-disabled:opacity-50 has-disabled:bg-gray-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-gray-8 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-gray-8/50",
        "has-[[data-slot][aria-invalid=true]]:border-danger has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-danger/20",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
        "has-[>[data-align=block-end]]:[&>input]:pt-1 has-[>[data-align=block-start]]:[&>input]:pb-1",
        "has-[>[data-align=inline-end]]:[&>input]:pr-0.5 has-[>[data-align=inline-start]]:[&>input]:pl-0.5",
        "in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0",
        className
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-0.5 py-0.5 text-sm font-medium text-gray-11 select-none group-data-[disabled=true]/input-group:opacity-50 [&_.icon]:block",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-1 has-[>button]:-ml-0.5",
        "inline-end": "order-last pr-1 has-[>button]:-mr-0.5",
        "block-start":
          "order-first w-full justify-start px-1.5 pt-1 group-has-[>input]/input-group:pt-1 [.border-b]:pb-1",
        "block-end":
          "order-last w-full justify-start px-1.5 pb-1 group-has-[>input]/input-group:pb-1 [.border-t]:pt-1",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement
          ?.querySelector<HTMLElement>(
            "input[data-slot=input-group-control], textarea[data-slot=input-group-control]"
          )
          ?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center gap-0.5 text-sm shadow-none", {
  variants: {
    size: {
      xs: "h-2.5 gap-0.5 px-0.5",
      sm: "h-3 px-1",
      "icon-xs": "size-2.5 p-0",
      "icon-sm": "size-3 p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

type InputGroupButtonSize = NonNullable<
  VariantProps<typeof inputGroupButtonVariants>["size"]
>;

function InputGroupButton({
  className,
  type = "button",
  variant = "link",
  size = "xs",
  ...props
}: Omit<ButtonProps, "size"> & {
  size?: InputGroupButtonSize;
}) {
  const buttonSize =
    size === "icon-xs" || size === "icon-sm"
      ? "icon"
      : size === "sm"
        ? "sm"
        : "xs";

  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      size={buttonSize}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-sm text-gray-11 [&_svg]:pointer-events-none [&_.icon]:block",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-1 text-sm text-gray-12 shadow-none outline-none placeholder:text-gray-11 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "min-h-16 flex-1 resize-none rounded-none border-0 bg-transparent px-1 py-1 text-sm shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
