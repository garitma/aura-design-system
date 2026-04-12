"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/utils/class-names";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  className?: string;
  /** Renders the range summary (default: English “Showing … to … of … results”). */
  renderSummary?: (ctx: {
    from: number;
    to: number;
    total: number;
  }) => React.ReactNode;
  /** Sort dropdown moved from toolbar (optional). */
  sortControl?: React.ReactNode;
  /** Row-count options for the page-size select (default: 10, 20, 50, 100). */
  pageSizeOptions?: number[];
}

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100] as const;

export function DataTablePagination<TData>({
  table,
  className,
  renderSummary,
  sortControl,
  pageSizeOptions = [...DEFAULT_PAGE_SIZES],
}: DataTablePaginationProps<TData>) {
  const filteredRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const from = filteredRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, filteredRows);

  const rawPageCount = table.getPageCount();
  const pageCount =
    filteredRows === 0 ? 1 : Math.max(1, rawPageCount);

  const displayPage = Math.min(pageIndex + 1, pageCount);

  const resolvedPageSizes = React.useMemo(() => {
    const list = [...pageSizeOptions];
    if (!list.includes(pageSize)) {
      list.push(pageSize);
      list.sort((a, b) => a - b);
    }
    return list;
  }, [pageSize, pageSizeOptions]);

  const defaultSummary = (
    <span className="text-sm text-gray-11">
      Showing {from} to {to} of {filteredRows} results
    </span>
  );

  const [pageInput, setPageInput] = React.useState(String(displayPage));

  React.useEffect(() => {
    setPageInput(String(displayPage));
  }, [displayPage]);

  const commitPageIndex = React.useCallback(
    (raw: string) => {
      const n = Number.parseInt(raw, 10);
      if (Number.isNaN(n)) {
        setPageInput(String(displayPage));
        return;
      }
      const clamped = Math.min(Math.max(1, n), pageCount);
      table.setPageIndex(clamped - 1);
      setPageInput(String(clamped));
    },
    [displayPage, pageCount, table],
  );

  const onPageInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-2 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        {renderSummary
          ? renderSummary({ from, to, total: filteredRows })
          : defaultSummary}
      </div>
      <div className="flex flex-wrap items-center gap-1">
     
        
        <div className="flex items-center gap-0.5">
          <Button
           variant="pill"
            size="icon"
            type="button"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage() || filteredRows === 0}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="icon" />
          </Button>
          <Input
            type="number"
            min={1}
            max={pageCount}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onBlur={() => commitPageIndex(pageInput)}
            onKeyDown={onPageInputKeyDown}
            aria-label="Current page"
            className="w-5 px-0 text-center"
            disabled={filteredRows === 0}
          />
          <span className="text-sm text-gray-11">
            of {pageCount}
          </span>
          <Button
            variant="pill"
            size="icon"
            type="button"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage() || filteredRows === 0}
            aria-label="Previous page"
          >
            <ChevronRightIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}
