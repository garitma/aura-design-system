"use client";
import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { cn } from "../utils/class-names";
import { type ButtonProps, buttonVariants } from "@/components/ui/Button";

interface SearchToggleProps
  extends Omit<ComponentProps<"button">, "color">,
    ButtonProps {
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  hideIfDisabled,
  size = "icon-sm",
  color = "ghost",
  ...props
}: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          size,
          color,
        }),
        props.className
      )}
      data-search=""
      aria-label="Open Search"
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      {...props}
      className={cn(
        "inline-flex items-center gap-0  border border-gray-7 bg-gray-3 p-0.5 ps-1.5 text-sm text-gray-11 transition-colors hover:bg-accent-4 hover:text-accent-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-7",
        props.className
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-1" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd
            key={i}
            className="rounded-md border border-gray-7 bg-gray-2 px-0.5 text-gray-12"
          >
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
