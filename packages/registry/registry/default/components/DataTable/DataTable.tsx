"use client";

import * as React from "react";
import {
  BorderNoneIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/utils/class-names";

import {
  DataTablePagination,
  type DataTablePaginationProps,
} from "./DataTablePagination";

export interface DataTableSortOption {
  value: string;
  label: string;
  sorting: SortingState;
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  className?: string;
  /** Optional heading above the toolbar. */
  title?: React.ReactNode;
  /** Muted line under the title (e.g. segment label). */
  description?: React.ReactNode;
  /** Placeholder for the global filter input. */
  searchPlaceholder?: string;
  /** Toggle search field (default: true). */
  showSearch?: boolean;
  /** Debounce for global filter (default: 300). */
  searchDebounceMs?: number;
  /** Preset sort options (e.g. newest / oldest). Each option sets `sorting` when selected. */
  sortOptions?: DataTableSortOption[];
  /** When provided, shows a refresh control that calls this handler. */
  onRefresh?: () => void | Promise<void>;
  /** Replaces the default empty state when there are no rows. */
  emptyState?: React.ReactNode;
  /** Initial page size (default: 10). */
  initialPageSize?: number;
  /** Optional initial sorting (overrides first `sortOptions` entry when set). */
  initialSorting?: SortingState;
  /** Custom range summary in the footer (see `DataTablePagination`). */
  renderPaginationSummary?: DataTablePaginationProps<TData>["renderSummary"];
  /** Row-count options for the footer page-size select (default: 10, 20, 50, 100). */
  pageSizeOptions?: DataTablePaginationProps<TData>["pageSizeOptions"];
  /** Extra controls after search / refresh (e.g. primary actions). Sort lives in the footer. */
  toolbarEnd?: React.ReactNode;
}

function DefaultEmpty() {
  return (
    <Empty className="border-0 bg-transparent">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BorderNoneIcon className="icon" />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function DataTable<TData>({
  columns,
  data,
  className,
  title,
  description,
  searchPlaceholder = "Search…",
  showSearch = true,
  searchDebounceMs = 300,
  sortOptions,
  onRefresh,
  emptyState,
  initialPageSize = 10,
  initialSorting,
  renderPaginationSummary,
  pageSizeOptions,
  toolbarEnd,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(
    () => initialSorting ?? sortOptions?.[0]?.sorting ?? []
  );
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [debouncedGlobalFilter, setDebouncedGlobalFilter] = React.useState("");
  const [sortValue, setSortValue] = React.useState(
    () => sortOptions?.[0]?.value ?? ""
  );
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    const t = window.setTimeout(
      () => setDebouncedGlobalFilter(globalFilter),
      searchDebounceMs
    );
    return () => window.clearTimeout(t);
  }, [globalFilter, searchDebounceMs]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedGlobalFilter,
    },
  });

  const handleSortChange = React.useCallback(
    (value: string) => {
      setSortValue(value);
      const opt = sortOptions?.find((o) => o.value === value);
      if (opt) {
        setSorting(opt.sorting);
      }
    },
    [sortOptions]
  );

  const handleRefresh = React.useCallback(async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      window.setTimeout(() => setIsRefreshing(false), 400);
    }
  }, [onRefresh]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-gray-6 bg-gray-2 p-2",
        className
      )}
    >
      {(title != null ||
        description != null ||
        showSearch ||
        onRefresh ||
        toolbarEnd) && (
        <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            {title != null && (
              <h2 className="h6 font-semibold text-gray-12">{title}</h2>
            )}
            {description != null && (
              <p className="text-sm text-gray-11">{description}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {showSearch && (
              <div className="flex min-w-0 flex-1 items-center gap-1 md:max-w-20 md:flex-none">
                <MagnifyingGlassIcon
                  className="icon shrink-0 text-gray-11"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <Input
                    type="search"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder={searchPlaceholder}
                    aria-label={searchPlaceholder}
                  />
                </div>
              </div>
            )}
            {onRefresh && (
              <Button
                variant="pill"
                size="icon-md"
                type="button"
                onClick={() => void handleRefresh()}
                isDisabled={isRefreshing}
                className="border border-gray-7 hover:border-gray-8 hover:bg-gray-3"
                aria-label="Refresh"
              >
                <ReloadIcon
                  className={cn("icon", isRefreshing && "animate-spin")}
                />
              </Button>
            )}
            {toolbarEnd}
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className="group relative"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center align-middle"
              >
                {emptyState ?? <DefaultEmpty />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination
        table={table}
        renderSummary={renderPaginationSummary}
        pageSizeOptions={pageSizeOptions}
        sortControl={
          sortOptions && sortOptions.length > 0 ? (
            <Select value={sortValue} onValueChange={handleSortChange}>
              <SelectTrigger className="min-w-15 w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : null
        }
      />
    </div>
  );
}

export { DataTablePagination } from "./DataTablePagination";
