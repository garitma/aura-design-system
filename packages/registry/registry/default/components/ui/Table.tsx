"use client"

import * as React from "react"

import { cn } from "@/utils/class-names"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full min-w-0 max-w-full overflow-x-auto border-gray-a6"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm hidden md:table", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b border-gray-a6", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0 ", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-gray-2 border-t border-gray-a6 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-gray-3 data-[state=selected]:bg-gray-4 border-b border-gray-a6 transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-gray-11 h-3 px-1 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border-gray-a6",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-1 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border-gray-a6",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-gray-11 mt-2 text-sm", className)}
      {...props}
    />
  )
}

/**
 * Responsive table card layout for mobile screens
 * Displays table data as cards on screens smaller than medium
 */
interface ResponsiveTableCardProps {
  headers: Array<{
    id: string;
    header: React.ReactNode;
  }>;
  rows: Array<{
    id: string;
    cells: Array<{
      id: string;
      content: React.ReactNode;
    }>;
    prefixContent?: React.ReactNode;
  }>;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

function ResponsiveTableCard({
  headers,
  rows,
  isLoading = false,
  emptyState,
  className,
}: ResponsiveTableCardProps) {
  if (isLoading) {
    return (
      <div className={cn("md:hidden space-y-2", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-2 border border-gray-6 rounded-md p-2 animate-pulse"
          >
            <div className="h-4 bg-gray-4 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-4 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className={cn("md:hidden", className)}>
        {emptyState || <div className="text-center py-8 text-gray-11">No hay resultados</div>}
      </div>
    );
  }

  return (
    <div className={cn("md:hidden space-y-2", className)}>
      {rows.map((row) => (
        <div
          key={row.id}
          className="bg-gray-2 border border-gray-6 rounded-md p-2 space-y-1.5"
        >
          {row.prefixContent && (
            <div>
              {row.prefixContent}
            </div>
          )}
          {row.cells.map((cell, cellIndex) => {
            const header = headers[cellIndex];
            // Skip empty header columns (like actions column header)
            if (!header || (!header.header && header.id === "actions")) {
              return (
                <div key={cell.id} className="flex justify-end pt-1">
                  {cell.content}
                </div>
              );
            }

            return (
              <div key={cell.id} className="flex flex-col gap-0.5">
                <div className="text-gray-11 text-xs font-medium">
                  {header.header}
                </div>
                <div className="text-gray-12 text-sm">
                  {cell.content}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  ResponsiveTableCard,
}
