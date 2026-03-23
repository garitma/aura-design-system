"use client";

interface DataGridKeyboardShortcutsProps {
  enableSearch?: boolean;
}

/**
 * Screen-reader-only summary of data grid keyboard interactions.
 */
export function DataGridKeyboardShortcuts({
  enableSearch = false,
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
    </div>
  );
}
