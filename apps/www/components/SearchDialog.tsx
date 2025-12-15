"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import useSWR from "swr";
import Link from "fumadocs-core/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/class-names";

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

const fetcher = async (url: string): Promise<SearchResult[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading } = useSWR<SearchResult[]>(
    query.trim() ? `/api/search?query=${encodeURIComponent(query.trim())}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 200,
    }
  );

  // Autofocus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      // Small delay to ensure dialog is fully rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const results = data ?? [];
  const hasResults = results.length > 0;
  const showEmptyState = query.trim() && !isLoading && !hasResults && !error;
  const showInitialState = !query.trim() && !isLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl p-0 gap-0 shadow [&>button]:hidden top-4 translate-y-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-2 relative py-1">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="flex items-center gap-1">
            <Search className="size-1 text-gray-11" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search documentation…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent p-1 text-gray-12 placeholder:text-gray-11 focus-visible:outline-none focus-visible:ring-0"
              autoComplete="off"
            />
            {isLoading && (
              <Loader2 className="size-1 text-gray-11 animate-spin" />
            )}
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <kbd className="rounded-md border border-gray-6 bg-gray-2 px-0.5 text-gray-12 text-xs">
              ESC
            </kbd>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
         

          {showEmptyState && (
            <div className="p-4 text-center text-sm text-gray-11">
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-sm text-gray-11">
              <p>Failed to load search results. Please try again.</p>
            </div>
          )}

          {hasResults && (
            <div className="p-1">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "block p-1.5 rounded-md text-sm transition-colors",
                    "hover:bg-gray-3 focus-visible:bg-gray-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-7"
                  )}
                >
                  <div className="font-medium text-gray-12">
                    {result.contentWithHighlights ? (
                      <span>
                        {result.contentWithHighlights.map((part, idx) => (
                          <span
                            key={idx}
                            className={part.styles?.highlight ? "bg-accent-a6 text-accent-12" : ""}
                          >
                            {part.content}
                          </span>
                        ))}
                      </span>
                    ) : (
                      result.content
                    )}
                  </div>
                  {result.breadcrumbs && result.breadcrumbs.length > 0 && (
                    <div className="mt-0.5 text-xs text-gray-11">
                      {result.breadcrumbs.join(" / ")}
                    </div>
                  )}
                  {result.type !== "page" && (
                    <div className="mt-0.5 text-xs text-gray-11 truncate">
                      {result.url}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SearchDialogTriggerProps {
  className?: string;
}

export function SearchDialogTrigger({ className }: SearchDialogTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1 border border-gray-6 bg-gray-1 p-0.5 ps-1.5 text-sm text-gray-11 transition-colors cursor-pointer rounded-sm",
          "hover:bg-gray-3 hover:text-gray-12",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-7",
          className
        )}
        aria-label="Open search"
      >
        <Search className="size-1" />
        <span className="max-sm:hidden">Search</span>
        <div className="ms-auto inline-flex gap-0.5 max-sm:hidden">
          <kbd className="rounded-md border border-gray-6 bg-gray-2 px-0.5 text-gray-12 text-xs">
            ⌘
          </kbd>
          <kbd className="rounded-md border border-gray-6 bg-gray-2 px-0.5 text-gray-12 text-xs">
            K
          </kbd>
        </div>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function SearchDialogTriggerIcon({ className }: SearchDialogTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center justify-center w-3 h-3 rounded-sm border border-gray-6 bg-gray-1 cursor-pointer transition-colors hover:bg-gray-3",
          className
        )}
        aria-label="Open search"
      >
        <Search className="w-1 h-1 text-gray-11" />
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
