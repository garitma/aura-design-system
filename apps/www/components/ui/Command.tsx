"use client";

import { Dialog as CommandDialogPrimitive } from "@base-ui/react/dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { cn } from "@/utils/class-names";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from "@/components/ui/Autocomplete";

const CommandInputContext = React.createContext<{
  inputRef: React.RefObject<HTMLInputElement | null> | null;
}>({
  inputRef: null,
});

const CommandDialog = CommandDialogPrimitive.Root;

const CommandDialogPortal = CommandDialogPrimitive.Portal;

function CommandDialogTrigger(props: CommandDialogPrimitive.Trigger.Props) {
  return (
    <CommandDialogPrimitive.Trigger
      data-slot="command-dialog-trigger"
      {...props}
    />
  );
}

function CommandDialogBackdrop({
  className,
  ...props
}: CommandDialogPrimitive.Backdrop.Props) {
  return (
    <CommandDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-gray-9a backdrop-blur-xs transition-all",
        className,
      )}
      data-slot="command-dialog-backdrop"
      {...props}
    />
  );
}

function CommandDialogViewport({
  className,
  ...props
}: CommandDialogPrimitive.Viewport.Props) {
  return (
    <CommandDialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center px-2 py-[max(--spacing(4),4vh)] sm:py-[10vh]",
        className,
      )}
      data-slot="command-dialog-viewport"
      {...props}
    />
  );
}

function CommandDialogPopup({
  className,
  children,
  ...props
}: CommandDialogPrimitive.Popup.Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <CommandDialogPortal>
      <CommandDialogBackdrop />
      <CommandDialogViewport>
        <CommandDialogPrimitive.Popup
          className={cn(
            "-translate-y-[calc(1.25rem*var(--nested-dialogs))] relative row-start-2 flex max-h-100 min-h-0 w-full min-w-0 max-w-xl scale-[calc(1-0.1*var(--nested-dialogs))] flex-col rounded-2xl border border-gray-a6 bg-gray-1 bg-clip-padding text-gray-12 opacity-[calc(1-0.1*var(--nested-dialogs))] shadow-lg transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-gray-a2 data-nested:data-ending-style:translate-y-8 data-nested:data-starting-style:translate-y-8 data-nested-dialog-open:origin-top data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1",
            className,
          )}
          data-slot="command-dialog-popup"
          initialFocus={inputRef}
          {...props}
        >
          <CommandInputContext.Provider value={{ inputRef }}>
            {children}
          </CommandInputContext.Provider>
        </CommandDialogPrimitive.Popup>
      </CommandDialogViewport>
    </CommandDialogPortal>
  );
}

function Command({
  autoHighlight = "always",
  keepHighlight = true,
  open = true,
  ...props
}: React.ComponentProps<typeof Autocomplete>) {
  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      keepHighlight={keepHighlight}
      open={open}
      {...props}
    />
  );
}

function CommandInput({
  className,
  placeholder = undefined,
  ...props
}: React.ComponentProps<typeof AutocompleteInput>) {
  const { inputRef } = React.useContext(CommandInputContext);

  return (
    <div className="px-1.5 py-0.5">
      <AutocompleteInput
        className={cn(
          "border-transparent! bg-transparent shadow-none before:hidden has-focus-visible:ring-0 pl-5",
          className,
        )}
        placeholder={placeholder}
        ref={inputRef}
        size="lg"
        startAddon={<MagnifyingGlassIcon />}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteList>) {
  return (
    <AutocompleteList
      className={cn("not-empty:scroll-py-2 not-empty:p-2", className)}
      data-slot="command-list"
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteEmpty>) {
  return (
    <AutocompleteEmpty
      className={cn("empty:hidden not-empty:py-6", className)}
      data-slot="command-empty"
      {...props}
    />
  );
}

function CommandPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="-mx-px relative min-h-0 rounded-t-xl border border-gray-a6 bg-gray-1 bg-clip-padding [clip-path:inset(0_1px)] before:pointer-events-none before:absolute before:inset-0 before:rounded-t-[calc(var(--radius-xl)-1px)] **:data-[slot=scroll-area-scrollbar]:mt-2"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroup>) {
  return (
    <AutocompleteGroup
      className={className}
      data-slot="command-group"
      {...props}
    />
  );
}

function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroupLabel>) {
  return (
    <AutocompleteGroupLabel
      className={className}
      data-slot="command-group-label"
      {...props}
    />
  );
}

function CommandCollection({
  ...props
}: React.ComponentProps<typeof AutocompleteCollection>) {
  return <AutocompleteCollection data-slot="command-collection" {...props} />;
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteItem>) {
  return (
    <AutocompleteItem
      className={cn("py-1.5", className)}
      data-slot="command-item"
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteSeparator>) {
  return (
    <AutocompleteSeparator
      className={cn("my-2", className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <span
      className={cn(
        "ms-auto font-medium text-gray-11 text-xs tracking-widest",
        className,
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

function CommandFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 rounded-b-[calc(var(--radius-2xl)-1px)] border-t border-gray-a6 bg-gray-2 px-2 py-1 text-gray-11 text-xs z-10",
        className,
      )}
      data-slot="command-footer"
      {...props}
    />
  );
}

export {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
};
