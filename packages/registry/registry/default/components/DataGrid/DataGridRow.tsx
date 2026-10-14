"use client";

import type {
  ColumnPinningState,
  Row,
  TableMeta,
  VisibilityState,
} from "@tanstack/react-table";
import type { VirtualItem } from "@tanstack/react-virtual";
import * as React from "react";
import { DataGridCell } from "./DataGridCell";
import { useComposedRefs } from "@/utils/compose-refs";
import type {
  CellPosition,
  Direction,
  RowHeightValue,
} from "./types";
import { cn } from "@/utils/class-names";
import {
  flexRender,
  getCellKey,
  getColumnBorderVisibility,
  getColumnPinningStyle,
  getRowHeightValue,
} from "./data-grid-utils";

interface DataGridRowProps<TData> extends React.ComponentProps<"div"> {
  row: Row<TData>;
  tableMeta: TableMeta<TData>;
  virtualItem: VirtualItem;
  measureElement: (node: Element | null) => void;
  rowMapRef: React.RefObject<Map<number, HTMLDivElement>>;
  rowHeight: RowHeightValue;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  focusedCell: CellPosition | null;
  editingCell: CellPosition | null;
  cellSelectionKeys: Set<string>;
  searchMatchColumns: Set<string> | null;
  activeSearchMatch: CellPosition | null;
  dir: Direction;
  readOnly: boolean;
  stretchColumns: boolean;
  adjustLayout: boolean;
}

export const DataGridRow = React.memo(DataGridRowImpl, (prev, next) => {
  const prevRowIndex = prev.virtualItem.index;
  const nextRowIndex = next.virtualItem.index;

  if (prev.row.id !== next.row.id) {
    return false;
  }

  if (prev.row.original !== next.row.original) {
    return false;
  }

  if (prev.virtualItem.start !== next.virtualItem.start) {
    return false;
  }

  const prevHasFocus = prev.focusedCell?.rowIndex === prevRowIndex;
  const nextHasFocus = next.focusedCell?.rowIndex === nextRowIndex;

  if (prevHasFocus !== nextHasFocus) {
    return false;
  }

  if (nextHasFocus && prevHasFocus) {
    if (prev.focusedCell?.columnId !== next.focusedCell?.columnId) {
      return false;
    }
  }

  const prevHasEditing = prev.editingCell?.rowIndex === prevRowIndex;
  const nextHasEditing = next.editingCell?.rowIndex === nextRowIndex;

  if (prevHasEditing !== nextHasEditing) {
    return false;
  }

  if (nextHasEditing && prevHasEditing) {
    if (prev.editingCell?.columnId !== next.editingCell?.columnId) {
      return false;
    }
  }

  if (prev.cellSelectionKeys !== next.cellSelectionKeys) {
    return false;
  }

  if (prev.columnVisibility !== next.columnVisibility) {
    return false;
  }

  if (prev.rowHeight !== next.rowHeight) {
    return false;
  }

  if (prev.columnPinning !== next.columnPinning) {
    return false;
  }

  if (prev.readOnly !== next.readOnly) {
    return false;
  }

  if (prev.searchMatchColumns !== next.searchMatchColumns) {
    return false;
  }

  if (prev.activeSearchMatch?.columnId !== next.activeSearchMatch?.columnId) {
    return false;
  }

  if (prev.dir !== next.dir) {
    return false;
  }

  if (prev.adjustLayout !== next.adjustLayout) {
    return false;
  }

  if (prev.stretchColumns !== next.stretchColumns) {
    return false;
  }

  return true;
}) as typeof DataGridRowImpl;

function DataGridRowImpl<TData>({
  row,
  tableMeta,
  virtualItem,
  measureElement,
  rowMapRef,
  rowHeight,
  columnVisibility,
  columnPinning,
  focusedCell,
  editingCell,
  cellSelectionKeys,
  searchMatchColumns,
  activeSearchMatch,
  dir,
  readOnly,
  stretchColumns,
  adjustLayout,
  className,
  style,
  ref,
  ...props
}: DataGridRowProps<TData>) {
  const virtualRowIndex = virtualItem.index;

  const onRowChange = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof virtualRowIndex === "undefined") return;

      if (node) {
        measureElement(node);
        rowMapRef.current?.set(virtualRowIndex, node);
      } else {
        rowMapRef.current?.delete(virtualRowIndex);
      }
    },
    [virtualRowIndex, measureElement, rowMapRef],
  );

  const rowRef = useComposedRefs(ref, onRowChange);

  const isRowSelected = row.getIsSelected();

  const visibleCells = React.useMemo(
    () => row.getVisibleCells(),
    [row, columnVisibility, columnPinning],
  );

  return (
    <div
      key={row.id}
      role="row"
      aria-rowindex={virtualRowIndex + 2}
      aria-selected={isRowSelected}
      data-index={virtualRowIndex}
      data-slot="grid-row"
      tabIndex={-1}
      {...props}
      ref={rowRef}
      className={cn(
        "group absolute flex w-full border-b border-gray-6 [content-visibility:auto]",
        !adjustLayout && "will-change-transform",
        className,
      )}
      style={{
        height: `${getRowHeightValue(rowHeight)}px`,
        ...(adjustLayout
          ? { top: `${virtualItem.start}px` }
          : { transform: `translateY(${virtualItem.start}px)` }),
        ...style,
      }}
    >
      {visibleCells.map((cell, colIndex) => {
        const columnId = cell.column.id;

        const isCellFocused =
          focusedCell?.rowIndex === virtualRowIndex &&
          focusedCell?.columnId === columnId;
        const isCellEditing =
          editingCell?.rowIndex === virtualRowIndex &&
          editingCell?.columnId === columnId;
        const isCellSelected =
          cellSelectionKeys?.has(getCellKey(virtualRowIndex, columnId)) ??
          false;

        const isSearchMatch = searchMatchColumns?.has(columnId) ?? false;
        const isActiveSearchMatch = activeSearchMatch?.columnId === columnId;

        const nextCell = visibleCells[colIndex + 1];
        const isLastColumn = colIndex === visibleCells.length - 1;
        const { showEndBorder, showStartBorder } = getColumnBorderVisibility({
          column: cell.column,
          nextColumn: nextCell?.column,
          isLastColumn,
        });

        return (
          <div
            key={cell.id}
            role="gridcell"
            aria-colindex={colIndex + 1}
            data-highlighted={isCellFocused ? "" : undefined}
            data-slot="grid-cell"
            tabIndex={-1}
            className={cn(
              (showEndBorder || showStartBorder) &&
                columnId !== "select" &&
                "border-gray-6",
              {
                grow: stretchColumns && columnId !== "select",
                "border-e": showEndBorder && columnId !== "select",
                "border-s": showStartBorder && columnId !== "select",
              },
            )}
            style={{
              ...getColumnPinningStyle({
                column: cell.column,
                dir,
                pinnedSurface: "body",
              }),
              width: `calc(var(--col-${columnId}-size) * 1px)`,
            }}
          >
            {typeof cell.column.columnDef.header === "function" ? (
              <div
                className={cn("size-full px-0.5 py-0.5", {
                  "bg-accent-3": isRowSelected,
                })}
                onContextMenu={(event) => {
                  tableMeta?.onCellContextMenu?.(
                    virtualRowIndex,
                    columnId,
                    event,
                  );
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ) : (
              <DataGridCell
                cell={cell}
                tableMeta={tableMeta}
                rowIndex={virtualRowIndex}
                columnId={columnId}
                rowHeight={rowHeight}
                isFocused={isCellFocused}
                isEditing={isCellEditing}
                isSelected={isCellSelected}
                isSearchMatch={isSearchMatch}
                isActiveSearchMatch={isActiveSearchMatch}
                readOnly={readOnly}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
