"use client";

/**
 * @description A dropdown menu on desktop and a stacked drawer on mobile.
 */
import * as React from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

type StackEntry = {
  id: string;
  title: React.ReactNode;
};

type ResponsiveDropdownMenuContextValue = {
  isMobile: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  stack: StackEntry[];
  push: (entry: StackEntry) => void;
  pop: () => void;
  portalContainer: HTMLDivElement | null;
  setPortalContainer: (container: HTMLDivElement | null) => void;
};

const ResponsiveDropdownMenuContext =
  React.createContext<ResponsiveDropdownMenuContextValue | null>(null);

const MobilePanelDepthContext = React.createContext(0);
const SubContext = React.createContext<{ id: string; depth: number } | null>(
  null,
);
const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | null>(null);

function useResponsiveDropdownMenu() {
  const context = React.useContext(ResponsiveDropdownMenuContext);

  if (!context) {
    throw new Error(
      "`useResponsiveDropdownMenu` must be used within `ResponsiveDropdownMenu`",
    );
  }

  return context;
}

interface ResponsiveDropdownMenuProps
  extends React.ComponentProps<typeof DropdownMenu> {
  breakpoint?: number;
}

function ResponsiveDropdownMenu({
  breakpoint = 768,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  modal,
  ...props
}: ResponsiveDropdownMenuProps) {
  const isMobile = useIsMobile(breakpoint);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [stack, setStack] = React.useState<StackEntry[]>([]);
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement | null>(null);
  const open = openProp ?? internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) setInternalOpen(nextOpen);
      if (!nextOpen) setStack([]);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, openProp],
  );

  const push = React.useCallback((entry: StackEntry) => {
    setStack((current) => {
      const existingIndex = current.findIndex(({ id }) => id === entry.id);
      if (existingIndex >= 0) return current.slice(0, existingIndex + 1);
      return [...current, entry];
    });
  }, []);

  const pop = React.useCallback(() => {
    setStack((current) => current.slice(0, -1));
  }, []);

  const context = React.useMemo(
    () => ({
      isMobile,
      open,
      setOpen,
      stack,
      push,
      pop,
      portalContainer,
      setPortalContainer,
    }),
    [isMobile, open, pop, portalContainer, push, setOpen, stack],
  );

  const root = isMobile ? (
    <Drawer open={open} onOpenChange={setOpen} modal={modal}>
      {children}
    </Drawer>
  ) : (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={modal} {...props}>
      {children}
    </DropdownMenu>
  );

  return (
    <ResponsiveDropdownMenuContext.Provider value={context}>
      {root}
    </ResponsiveDropdownMenuContext.Provider>
  );
}

function ResponsiveDropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (isMobile) {
    return <DrawerTrigger data-variant="drawer" {...props} />;
  }

  return <DropdownMenuTrigger data-variant="dropdown" {...props} />;
}

function ResponsiveDropdownMenuPortal({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (isMobile) return <>{children}</>;
  return <DropdownMenuPortal {...props}>{children}</DropdownMenuPortal>;
}

interface ResponsiveDropdownMenuContentProps
  extends React.ComponentProps<typeof DropdownMenuContent> {
  mobileTitle?: React.ReactNode;
}

function ResponsiveDropdownMenuContent({
  className,
  children,
  mobileTitle = "Menu",
  ...props
}: ResponsiveDropdownMenuContentProps) {
  const { isMobile, stack, pop, setPortalContainer } =
    useResponsiveDropdownMenu();

  if (!isMobile) {
    return (
      <DropdownMenuContent
        data-variant="dropdown"
        className={className}
        {...props}
      >
        {children}
      </DropdownMenuContent>
    );
  }

  const currentTitle = stack[stack.length - 1]?.title ?? mobileTitle;

  return (
    <DrawerContent
      data-variant="drawer"
      className={cn("responsive-dropdown-drawer", className)}
    >
      <DrawerHeader className="responsive-dropdown-header">
        {stack.length > 0 ? (
          <button
            type="button"
            className="responsive-dropdown-back"
            onClick={pop}
            aria-label="Back"
          >
            <ChevronLeftIcon className="icon" />
          </button>
        ) : null}
        <DrawerTitle className="responsive-dropdown-title">
          {currentTitle}
        </DrawerTitle>
      </DrawerHeader>
      <div
        ref={setPortalContainer}
        className="responsive-dropdown-stack"
        data-depth={stack.length}
      >
        <MobilePanelDepthContext.Provider value={0}>
          <div
            className="responsive-dropdown-panel"
            data-panel-state={stack.length === 0 ? "current" : "previous"}
            aria-hidden={stack.length > 0}
          >
            {children}
          </div>
        </MobilePanelDepthContext.Provider>
      </div>
    </DrawerContent>
  );
}

function ResponsiveDropdownMenuGroup({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (isMobile) {
    return (
      <div
        role="group"
        data-slot="responsive-dropdown-menu-group"
        className={className}
        {...props}
      />
    );
  }

  return <DropdownMenuGroup className={className} {...props} />;
}

function ResponsiveDropdownMenuItem({
  asChild,
  children,
  className,
  disabled,
  onClick,
  onSelect,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  const { isMobile, setOpen } = useResponsiveDropdownMenu();

  if (!isMobile) {
    return (
      <DropdownMenuItem
        asChild={asChild}
        className={className}
        disabled={disabled}
        onClick={onClick}
        onSelect={onSelect}
        {...props}
      >
        {children}
      </DropdownMenuItem>
    );
  }

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      {...(props as React.ComponentPropsWithoutRef<"button">)}
      type={asChild ? undefined : "button"}
      role="menuitem"
      disabled={asChild ? undefined : disabled}
      data-disabled={disabled ? "" : undefined}
      className={cn("responsive-dropdown-item", className)}
      onClick={(event) => {
        onClick?.(event as never);
        onSelect?.(event.nativeEvent);
        if (!event.defaultPrevented && !disabled) setOpen(false);
      }}
    >
      {children}
    </Comp>
  );
}

function ResponsiveDropdownMenuCheckboxItem({
  checked,
  children,
  className,
  disabled,
  onCheckedChange,
  onSelect,
  ...props
}: React.ComponentProps<typeof DropdownMenuCheckboxItem>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (!isMobile) {
    return (
      <DropdownMenuCheckboxItem
        checked={checked}
        className={className}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        onSelect={onSelect}
        {...props}
      >
        {children}
      </DropdownMenuCheckboxItem>
    );
  }

  const isChecked = checked === true;

  return (
    <button
      {...(props as React.ComponentPropsWithoutRef<"button">)}
      type="button"
      role="menuitemcheckbox"
      aria-checked={isChecked}
      disabled={disabled}
      className={cn("responsive-dropdown-item", className)}
      onClick={(event) => {
        onSelect?.(event.nativeEvent);
        if (!event.defaultPrevented && !disabled) {
          onCheckedChange?.(!isChecked);
        }
      }}
    >
      <span className="responsive-dropdown-indicator" aria-hidden="true">
        {isChecked ? <CheckIcon className="icon" /> : null}
      </span>
      {children}
    </button>
  );
}

function ResponsiveDropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (!isMobile) {
    return (
      <DropdownMenuRadioGroup
        value={value}
        onValueChange={onValueChange}
        className={className}
        {...props}
      >
        {children}
      </DropdownMenuRadioGroup>
    );
  }

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        role="group"
        className={className}
        {...(props as React.ComponentPropsWithoutRef<"div">)}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

function ResponsiveDropdownMenuRadioItem({
  value,
  children,
  className,
  disabled,
  onSelect,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioItem>) {
  const { isMobile } = useResponsiveDropdownMenu();
  const group = React.useContext(RadioGroupContext);

  if (!isMobile) {
    return (
      <DropdownMenuRadioItem
        value={value}
        className={className}
        disabled={disabled}
        onSelect={onSelect}
        {...props}
      >
        {children}
      </DropdownMenuRadioItem>
    );
  }

  const isChecked = group?.value === value;

  return (
    <button
      {...(props as React.ComponentPropsWithoutRef<"button">)}
      type="button"
      role="menuitemradio"
      aria-checked={isChecked}
      disabled={disabled}
      className={cn("responsive-dropdown-item", className)}
      onClick={(event) => {
        onSelect?.(event.nativeEvent);
        if (!event.defaultPrevented && !disabled) group?.onValueChange?.(value);
      }}
    >
      <span className="responsive-dropdown-indicator" aria-hidden="true">
        {isChecked ? <DotFilledIcon className="icon" /> : null}
      </span>
      {children}
    </button>
  );
}

function ResponsiveDropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (isMobile) {
    return (
      <div
        data-slot="responsive-dropdown-menu-label"
        className={cn("responsive-dropdown-label", className)}
        {...props}
      />
    );
  }

  return <DropdownMenuLabel className={className} {...props} />;
}

function ResponsiveDropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  const { isMobile } = useResponsiveDropdownMenu();

  if (isMobile) {
    return (
      <div
        role="separator"
        className={cn("responsive-dropdown-separator", className)}
        {...props}
      />
    );
  }

  return <DropdownMenuSeparator className={className} {...props} />;
}

function ResponsiveDropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  const { isMobile } = useResponsiveDropdownMenu();

  return (
    <DropdownMenuShortcut
      aria-hidden={isMobile || undefined}
      className={cn(isMobile && "responsive-dropdown-shortcut", className)}
      {...props}
    />
  );
}

function ResponsiveDropdownMenuSub({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
  const { isMobile } = useResponsiveDropdownMenu();
  const parentDepth = React.useContext(MobilePanelDepthContext);
  const id = React.useId();

  if (!isMobile) {
    return <DropdownMenuSub {...props}>{children}</DropdownMenuSub>;
  }

  return (
    <SubContext.Provider value={{ id, depth: parentDepth + 1 }}>
      {children}
    </SubContext.Provider>
  );
}

function ResponsiveDropdownMenuSubTrigger({
  asChild,
  children,
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
  const { isMobile, push } = useResponsiveDropdownMenu();
  const sub = React.useContext(SubContext);

  if (!isMobile) {
    return (
      <DropdownMenuSubTrigger
        className={className}
        disabled={disabled}
        {...props}
      >
        {children}
      </DropdownMenuSubTrigger>
    );
  }

  if (!sub) {
    throw new Error(
      "`ResponsiveDropdownMenuSubTrigger` must be used within `ResponsiveDropdownMenuSub`",
    );
  }

  const title = React.isValidElement<{ children?: React.ReactNode }>(children)
    ? children.props.children
    : children;

  if (asChild && React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return (
      <Slot
        {...(props as React.ComponentPropsWithoutRef<typeof Slot>)}
        role="menuitem"
        data-disabled={disabled ? "" : undefined}
        className={cn("responsive-dropdown-item", className)}
        onClick={() => {
          if (!disabled) push({ id: sub.id, title });
        }}
      >
        {React.cloneElement(
          children,
          undefined,
          <>
            {children.props.children}
            <ChevronRightIcon className="icon responsive-dropdown-chevron" />
          </>
        )}
      </Slot>
    );
  }

  return (
    <button
      {...(props as React.ComponentPropsWithoutRef<"button">)}
      type="button"
      role="menuitem"
      disabled={disabled}
      data-disabled={disabled ? "" : undefined}
      className={cn("responsive-dropdown-item", className)}
      onClick={() => push({ id: sub.id, title })}
    >
      {children}
      <ChevronRightIcon className="icon responsive-dropdown-chevron" />
    </button>
  );
}

function ResponsiveDropdownMenuSubContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  const { isMobile, portalContainer, stack } = useResponsiveDropdownMenu();
  const sub = React.useContext(SubContext);

  if (!isMobile) {
    return (
      <DropdownMenuSubContent className={className} {...props}>
        {children}
      </DropdownMenuSubContent>
    );
  }

  if (!sub || !portalContainer) return null;

  const stackIndex = stack.findIndex(({ id }) => id === sub.id);
  const panelState =
    stackIndex === -1
      ? "next"
      : stackIndex === stack.length - 1
        ? "current"
        : "previous";

  return createPortal(
    <MobilePanelDepthContext.Provider value={sub.depth}>
      <div
        role="menu"
        className={cn("responsive-dropdown-panel", className)}
        data-panel-state={panelState}
        aria-hidden={panelState !== "current"}
        {...(props as React.ComponentPropsWithoutRef<"div">)}
      >
        {children}
      </div>
    </MobilePanelDepthContext.Provider>,
    portalContainer,
  );
}

export {
  ResponsiveDropdownMenu,
  ResponsiveDropdownMenuCheckboxItem,
  ResponsiveDropdownMenuContent,
  ResponsiveDropdownMenuGroup,
  ResponsiveDropdownMenuItem,
  ResponsiveDropdownMenuLabel,
  ResponsiveDropdownMenuPortal,
  ResponsiveDropdownMenuRadioGroup,
  ResponsiveDropdownMenuRadioItem,
  ResponsiveDropdownMenuSeparator,
  ResponsiveDropdownMenuShortcut,
  ResponsiveDropdownMenuSub,
  ResponsiveDropdownMenuSubContent,
  ResponsiveDropdownMenuSubTrigger,
  ResponsiveDropdownMenuTrigger,
};
