"use client";

import * as React from "react";
import { useComposedRefs } from "@/utils/compose-refs";
import type { DataGridCellProps } from "./types";
import { cn } from "@/utils/class-names";
import { getCellAccessibleLabel, getCellKey } from "./data-grid-utils";

interface DataGridCellWrapperProps<TData>
  extends DataGridCellProps<TData>,
    React.ComponentProps<"div"> {
  /** When set, the wrapper is exposed as a single checkbox control (no nested interactive buttons). */
  cellInteractionRole?: "checkbox";
  ariaChecked?: boolean;
}

export function DataGridCellWrapper<TData>({
  cell,
  tableMeta,
  rowIndex,
  columnId,
  isEditing,
  isFocused,
  isSelected,
  isSearchMatch,
  isActiveSearchMatch,
  readOnly,
  rowHeight,
  cellInteractionRole,
  ariaChecked,
  className,
  onClick: onClickProp,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: DataGridCellWrapperProps<TData>) {
  const cellAccessibleLabel = getCellAccessibleLabel(cell, rowIndex);
  const isCheckboxCell = cellInteractionRole === "checkbox";
  const cellMapRef = tableMeta?.cellMapRef;

  const onCellChange = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!cellMapRef) return;

      const cellKey = getCellKey(rowIndex, columnId);

      if (node) {
        cellMapRef.current.set(cellKey, node);
      } else {
        cellMapRef.current.delete(cellKey);
      }
    },
    [rowIndex, columnId, cellMapRef],
  );

  const composedRef = useComposedRefs(ref, onCellChange);

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isEditing) {
        event.preventDefault();
        onClickProp?.(event);
        if (isFocused && !readOnly && !isCheckboxCell) {
          tableMeta?.onCellEditingStart?.(rowIndex, columnId);
        } else {
          tableMeta?.onCellClick?.(rowIndex, columnId, event);
        }
      }
    },
    [
      tableMeta,
      rowIndex,
      columnId,
      isEditing,
      isFocused,
      readOnly,
      isCheckboxCell,
      onClickProp,
    ],
  );

  const onContextMenu = React.useCallback(
    (event: React.MouseEvent) => {
      if (!isEditing) {
        tableMeta?.onCellContextMenu?.(rowIndex, columnId, event);
      }
    },
    [tableMeta, rowIndex, columnId, isEditing],
  );

  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (!isEditing) {
        event.preventDefault();
        tableMeta?.onCellDoubleClick?.(rowIndex, columnId);
      }
    },
    [tableMeta, rowIndex, columnId, isEditing],
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownProp?.(event);

      if (event.defaultPrevented) return;

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === "PageUp" ||
        event.key === "PageDown" ||
        event.key === "Tab"
      ) {
        return;
      }

      if (isFocused && !isEditing && !readOnly && !isCheckboxCell) {
        if (event.key === "F2" || event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          tableMeta?.onCellEditingStart?.(rowIndex, columnId);
          return;
        }

        if (event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          tableMeta?.onCellEditingStart?.(rowIndex, columnId);
          return;
        }

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          event.stopPropagation();
          tableMeta?.onCellEditingStart?.(rowIndex, columnId);
        }
      }
    },
    [
      onKeyDownProp,
      isFocused,
      isEditing,
      readOnly,
      isCheckboxCell,
      tableMeta,
      rowIndex,
      columnId,
    ],
  );

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (!isEditing) {
        tableMeta?.onCellMouseDown?.(rowIndex, columnId, event);
      }
    },
    [tableMeta, rowIndex, columnId, isEditing],
  );

  const onMouseEnter = React.useCallback(() => {
    if (!isEditing) {
      tableMeta?.onCellMouseEnter?.(rowIndex, columnId);
    }
  }, [tableMeta, rowIndex, columnId, isEditing]);

  const onMouseUp = React.useCallback(() => {
    if (!isEditing) {
      tableMeta?.onCellMouseUp?.();
    }
  }, [tableMeta, isEditing]);

  return (
    <div
      role={isCheckboxCell ? "checkbox" : undefined}
      data-slot="grid-cell-wrapper"
      data-editing={isEditing ? "" : undefined}
      data-focused={isFocused ? "" : undefined}
      data-selected={isSelected ? "" : undefined}
      tabIndex={isFocused && !isEditing ? 0 : -1}
      aria-label={cellAccessibleLabel}
      aria-checked={isCheckboxCell ? ariaChecked : undefined}
      aria-readonly={!isCheckboxCell && readOnly ? true : undefined}
      aria-disabled={isCheckboxCell && readOnly ? true : undefined}
      {...props}
      ref={composedRef}
      className={cn(
        "size-full min-h-0 min-w-0 px-0.5 py-0.5 text-start text-xs text-gray-12 outline-none has-data-[slot=checkbox]:pt-0.5",
        {
          "ring-1 ring-gray-8 ring-inset": isFocused,
          "bg-accent-5": isActiveSearchMatch,
          "bg-accent-3":
            !isActiveSearchMatch &&
            (isSearchMatch || (isSelected && !isEditing)),
          "cursor-default": !isEditing,
          "**:data-[slot=grid-cell-content]:line-clamp-1":
            !isEditing && rowHeight === "short",
          "**:data-[slot=grid-cell-content]:line-clamp-2":
            !isEditing && rowHeight === "medium",
          "**:data-[slot=grid-cell-content]:line-clamp-3":
            !isEditing && rowHeight === "tall",
          "**:data-[slot=grid-cell-content]:line-clamp-4":
            !isEditing && rowHeight === "extra-tall",
        },
        className,
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    />
  );
}
