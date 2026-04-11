"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import * as React from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAsRef } from "@/hooks/use-as-ref";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import type { SearchState } from "./types";
import { cn } from "@/utils/class-names";

interface DataGridSearchProps extends SearchState {}

export const DataGridSearch = React.memo(DataGridSearchImpl, (prev, next) => {
  if (prev.searchOpen !== next.searchOpen) return false;

  if (!next.searchOpen) return true;

  if (
    prev.searchQuery !== next.searchQuery ||
    prev.matchIndex !== next.matchIndex
  ) {
    return false;
  }

  if (prev.searchMatches.length !== next.searchMatches.length) return false;

  for (let i = 0; i < prev.searchMatches.length; i++) {
    const prevMatch = prev.searchMatches[i];
    const nextMatch = next.searchMatches[i];

    if (!prevMatch || !nextMatch) return false;

    if (
      prevMatch.rowIndex !== nextMatch.rowIndex ||
      prevMatch.columnId !== nextMatch.columnId
    ) {
      return false;
    }
  }

  return true;
});

function DataGridSearchImpl({
  searchMatches,
  matchIndex,
  searchOpen,
  onSearchOpenChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onNavigateToNextMatch,
  onNavigateToPrevMatch,
}: DataGridSearchProps) {
  const propsRef = useAsRef({
    onSearchOpenChange,
    onSearchQueryChange,
    onSearch,
    onNavigateToNextMatch,
    onNavigateToPrevMatch,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (searchOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [searchOpen]);

  React.useEffect(() => {
    if (!searchOpen) return;

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        propsRef.current.onSearchOpenChange(false);
      }
    }

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [searchOpen, propsRef]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      event.stopPropagation();

      if (event.key === "Enter") {
        event.preventDefault();
        if (event.shiftKey) {
          propsRef.current.onNavigateToPrevMatch();
        } else {
          propsRef.current.onNavigateToNextMatch();
        }
      }
    },
    [propsRef],
  );

  const debouncedSearch = useDebouncedCallback((query: string) => {
    propsRef.current.onSearch(query);
  }, 150);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      propsRef.current.onSearchQueryChange(value);
      debouncedSearch(value);
    },
    [propsRef, debouncedSearch],
  );

  const onTriggerPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
      }

      if (
        event.button === 0 &&
        event.ctrlKey === false &&
        event.pointerType === "mouse" &&
        !(event.target instanceof HTMLInputElement)
      ) {
        event.preventDefault();
      }
    },
    [],
  );

  const onPrevMatchPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) =>
      onTriggerPointerDown(event),
    [onTriggerPointerDown],
  );

  const onNextMatchPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) =>
      onTriggerPointerDown(event),
    [onTriggerPointerDown],
  );

  const onClose = React.useCallback(() => {
    propsRef.current.onSearchOpenChange(false);
  }, [propsRef]);

  const onPrevMatch = React.useCallback(() => {
    propsRef.current.onNavigateToPrevMatch();
  }, [propsRef]);

  const onNextMatch = React.useCallback(() => {
    propsRef.current.onNavigateToNextMatch();
  }, [propsRef]);

  if (!searchOpen) return null;

  const inputClass =
    "h-3 w-64 rounded-md border border-gray-6 bg-gray-1 px-2 py-1 text-xs text-gray-12 placeholder:text-gray-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-8";

  return (
    <div
      role="search"
      data-slot="grid-search"
      className="fade-in-0 slide-in-from-top-2 absolute end-4 top-4 z-50 flex animate-in flex-col gap-2 rounded-md border border-gray-6 bg-gray-1 p-2 shadow-md"
    >
      <div className="flex items-center gap-2">
        <Input
          aria-label="Find in table"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Find in table..."
          className={cn(inputClass)}
          ref={inputRef}
          value={searchQuery}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <div className="flex items-center gap-1">
          <Button
            type="button"
            aria-label="Previous match"
            mode="pill"
            size="icon"
            className="shrink-0"
            onClick={onPrevMatch}
            onPointerDown={onPrevMatchPointerDown}
            disabled={searchMatches.length === 0}
          >
            <ChevronUpIcon className="icon" aria-hidden />
          </Button>
          <Button
            type="button"
            aria-label="Next match"
            mode="pill"
            size="icon"
            className="shrink-0"
            onClick={onNextMatch}
            onPointerDown={onNextMatchPointerDown}
            disabled={searchMatches.length === 0}
          >
            <ChevronDownIcon className="icon" aria-hidden />
          </Button>
          <Button
            type="button"
            aria-label="Close search"
            mode="pill"
            size="icon"
            className="shrink-0"
            onClick={onClose}
          >
            <Cross2Icon className="icon" aria-hidden />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap text-xs text-gray-11">
        {searchMatches.length > 0 ? (
          <span>
            {matchIndex + 1} of {searchMatches.length}
          </span>
        ) : searchQuery ? (
          <span>No results</span>
        ) : (
          <span>Type to search</span>
        )}
      </div>
    </div>
  );
}
