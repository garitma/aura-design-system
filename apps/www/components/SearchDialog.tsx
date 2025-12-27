"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Loader2, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import useSWR from "swr";
import Link from "fumadocs-core/link";
import * as React from "react";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
} from "@/components/ui/Command";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/utils/class-names";
import { Button } from "@/components/ui/Button";

interface SearchResult {
  id: string;
  type: "page" | "heading" | "text";
  content: string;
  url: string;
  breadcrumbs?: string[];
  contentWithHighlights?: Array<{
    type: "text";
    content: string;
    styles?: {
      highlight?: boolean;
    };
  }>;
}

interface QuickLink {
  value: string;
  label: string;
  url: string;
  description?: string;
}

interface SearchItem {
  value: string;
  label: string;
  url: string;
  type: "page" | "heading" | "text";
  breadcrumbs?: string[];
  contentWithHighlights?: Array<{
    type: "text";
    content: string;
    styles?: {
      highlight?: boolean;
    };
  }>;
}

interface Group {
  value: string;
  items: (QuickLink | SearchItem)[];
}

const searchFetcher = async (url: string): Promise<SearchResult[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
};

const quickLinksFetcher = async (): Promise<QuickLink[]> => {
  const res = await fetch("/api/quick-links");
  if (!res.ok) {
    return [];
  }
  return res.json();
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  // Fetch search results
  const {
    data: searchResults,
    error,
    isLoading,
  } = useSWR<SearchResult[]>(
    query.trim()
      ? `/api/search?query=${encodeURIComponent(query.trim())}`
      : null,
    searchFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 200,
    }
  );

  // Fetch quick links (suggestions)
  const { data: quickLinks = [] } = useSWR<QuickLink[]>(
    "/api/quick-links",
    quickLinksFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      // Handle ESC key to close dialog
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Transform search results to items
  const searchItems: SearchItem[] = useMemo(() => {
    if (!searchResults) return [];
    return searchResults.map((result) => ({
      value: result.id,
      label: result.content,
      url: result.url,
      type: result.type,
      breadcrumbs: result.breadcrumbs,
      contentWithHighlights: result.contentWithHighlights,
    }));
  }, [searchResults]);

  // Group items for Command component
  const groupedItems: Group[] = useMemo(() => {
    const groups: Group[] = [];

    if (query.trim()) {
      // When searching, show search results
      if (searchItems.length > 0) {
        groups.push({
          value: "Results",
          items: searchItems,
        });
      }
    } else {
      // When not searching, show quick links as suggestions
      if (quickLinks.length > 0) {
        groups.push({
          value: "Quick Links",
          items: quickLinks,
        });
      }
    }

    return groups;
  }, [query, searchItems, quickLinks]);

  function handleItemClick(item: QuickLink | SearchItem) {
    onOpenChange(false);
    // Navigation will be handled by the Link component
  }

  const showEmptyState =
    query.trim() && !isLoading && searchItems.length === 0 && !error;
  const showLoading = query.trim() && isLoading;

  return (
    <CommandDialog onOpenChange={onOpenChange} open={open}>
      <CommandDialogPopup>
        <Command items={groupedItems}>
          <CommandInput
            placeholder="Search documentation…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CommandPanel>
            <ScrollArea className="max-h-[60vh]">
              {showLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="size-1 text-gray-11 animate-spin" />
                </div>
              )}
              {showEmptyState && (
                <CommandEmpty>
                  No results found for &quot;{query}&quot;
                </CommandEmpty>
              )}
              {error && (
                <div className="p-4 text-center text-sm text-gray-11">
                  <p>Failed to load search results. Please try again.</p>
                </div>
              )}
              {!showLoading &&
                !showEmptyState &&
                !error &&
                groupedItems.length > 0 && (
                  <CommandList>
                    {(group: Group, _index: number) => (
                      <React.Fragment key={group.value}>
                        <CommandGroup items={group.items}>
                          <CommandGroupLabel>{group.value}</CommandGroupLabel>
                          <CommandCollection>
                            {(item: QuickLink | SearchItem) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onClick={() => {
                                  handleItemClick(item);
                                  window.location.href = item.url;
                                }}
                              >
                                <Link
                                  href={item.url}
                                  className="block w-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(item);
                                    window.location.href = item.url;
                                  }}
                                >
                                  <div className="flex flex-col gap-0.5">
                                    <div className="font-medium text-gray-12">
                                      {"contentWithHighlights" in item &&
                                      item.contentWithHighlights ? (
                                        <span>
                                          {item.contentWithHighlights.map(
                                            (part, idx) => (
                                              <span
                                                key={idx}
                                                className={
                                                  part.styles?.highlight
                                                    ? "bg-accent-a6 text-accent-12"
                                                    : ""
                                                }
                                              >
                                                {part.content}
                                              </span>
                                            )
                                          )}
                                        </span>
                                      ) : (
                                        item.label
                                      )}
                                    </div>
                                    {"description" in item &&
                                      item.description && (
                                        <div className="text-xs text-gray-11">
                                          {item.description}
                                        </div>
                                      )}
                                    {"breadcrumbs" in item &&
                                      item.breadcrumbs &&
                                      item.breadcrumbs.length > 0 && (
                                        <div className="text-xs text-gray-11">
                                          {item.breadcrumbs.join(" / ")}
                                        </div>
                                      )}
                                    {"type" in item && item.type !== "page" && (
                                      <div className="text-xs text-gray-11 truncate">
                                        {item.url}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              </CommandItem>
                            )}
                          </CommandCollection>
                        </CommandGroup>
                        {_index < groupedItems.length - 1 && (
                          <CommandSeparator />
                        )}
                      </React.Fragment>
                    )}
                  </CommandList>
                )}
            </ScrollArea>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                <KbdGroup>
                  <Kbd>
                    <ArrowUpIcon />
                  </Kbd>
                  <Kbd>
                    <ArrowDownIcon />
                  </Kbd>
                </KbdGroup>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Kbd>↵</Kbd>
                <span>Open</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <KbdGroup>
                <Kbd>Esc</Kbd>
              </KbdGroup>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

interface SearchDialogTriggerProps {
  className?: string;
}

export function SearchDialogTrigger({ className }: SearchDialogTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="pill"
        size="sm"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1 p-0.5 ps-1.5 text-sm",
          className
        )}
        aria-label="Open search"
      >
        <Search className="size-1" />
        <span className="max-sm:hidden">Search</span>
        <div className="ms-auto inline-flex gap-0.5 max-sm:hidden">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function SearchDialogTriggerIcon({
  className,
}: SearchDialogTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        variant="pill"
        size="icon"
        className={cn(className)}
        aria-label="Open search"
      >
        <Search className="w-1 h-1 text-gray-11" />
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
