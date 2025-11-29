"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { type ComponentProps, type ReactNode, useMemo, useState } from "react";
import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import { cn } from "../utils/class-names";
import { isTabActive } from "../utils/is-active";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import type { SidebarTab } from "fumadocs-ui/utils/get-sidebar-tabs";

export interface Option extends SidebarTab {
  props?: ComponentProps<"a">;
}

export function RootToggle({
  options,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode;
  options: Option[];
} & ComponentProps<"button">) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirect } = useSidebar();
  const pathname = usePathname();

  const selected = useMemo(() => {
    return options.findLast((item) => isTabActive(item, pathname));
  }, [options, pathname]);

  const onClick = () => {
    closeOnRedirect.current = false;
    setOpen(false);
  };

  const item = selected ? (
    <>
      <div className="size-3 shrink-0 empty:hidden md:size-1.5">
        {selected.icon}
      </div>
      <div>
        <p className="text-sm font-medium">{selected.title}</p>
        <p className="text-sm text-fd-muted-foreground empty:hidden md:hidden">
          {selected.description}
        </p>
      </div>
    </>
  ) : (
    placeholder
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {item && (
        <PopoverTrigger
          {...props}
          className={cn(
            "flex items-center gap-0.5 rounded-lg p-0.5 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground",
            props.className
          )}
        >
          {item}
          <ChevronsUpDown className="shrink-0 ms-auto size-1 text-fd-muted-foreground" />
        </PopoverTrigger>
      )}
      <PopoverContent className="flex flex-col gap-0.5 w-(--radix-popover-trigger-width) p-0.5 fd-scroll-container">
        {options.map((item) => {
          const isActive = selected && item.url === selected.url;
          if (!isActive && item.unlisted) return;

          return (
            <Link
              key={item.url}
              href={item.url}
              onClick={onClick}
              {...item.props}
              className={cn(
                "flex items-center gap-2 rounded-lg p-0.5 hover:bg-fd-accent hover:text-fd-accent-foreground",
                item.props?.className
              )}
            >
              <div className="shrink-0 size-9 md:mt-0.5 md:mb-auto md:size-5 empty:hidden">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-gray-11 empty:hidden">
                  {item.description}
                </p>
              </div>

              <Check
                className={cn(
                  "shrink-0 ms-auto size-1 text-fd-primary",
                  !isActive && "invisible"
                )}
              />
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
