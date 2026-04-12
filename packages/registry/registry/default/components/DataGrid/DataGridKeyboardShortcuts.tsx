"use client";

interface DataGridKeyboardShortcutsProps {
  enableSearch?: boolean;
  /** When the grid supports `onRowsDelete`, document row deletion shortcuts. */
  enableRowsDelete?: boolean;
}

/**
 * Screen-reader-only summary of data grid keyboard interactions.
 */
export function DataGridKeyboardShortcuts({
  enableSearch = false,
  enableRowsDelete = false,
}: DataGridKeyboardShortcutsProps) {
  return (
    <div className="sr-only">
      {enableSearch ? (
        <p>
          Press Command F or Control F to open find in table. Press Escape to
          close search. Press Enter or Shift Enter to jump between matches.
        </p>
      ) : null}
      <p>
        Use arrow keys to move between cells. Command A selects all cells.
        Command C copies, Command X cuts, Command V pastes. Shift Enter adds a
        row when supported. Delete or Backspace clears selected cells.
      </p>
      {enableRowsDelete ? (
        <p>
          Control or Command Delete, or Control or Command Backspace, deletes the
          selected rows or the row for the focused cell. You can also
          right-click and choose Delete rows.
        </p>
      ) : null}
    </div>
  );
}
