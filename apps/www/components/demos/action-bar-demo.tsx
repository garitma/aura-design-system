import * as React from "react";
import {
  ArchiveIcon,
  Cross2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/Button";
import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from "@/components/ui/ActionBar";

const rows = [
  { id: "1", name: "Invoice #1042" },
  { id: "2", name: "Invoice #1043" },
  { id: "3", name: "Invoice #1044" },
  { id: "4", name: "Invoice #1045" },
];


export const ActionBarDemo = () => {
  const [selected, setSelected] = React.useState<string[]>(["1", "3"]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-40 w-full max-w-md">
      <ul className="flex flex-col gap-0.5 border border-gray-6 rounded-md bg-gray-2 p-1">
        {rows.map((row) => {
          const checked = selected.includes(row.id);
          return (
            <li key={row.id}>
              <label className="flex cursor-pointer items-center gap-1 rounded-sm px-1 py-0.5 text-sm text-gray-12 hover:bg-gray-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(row.id)}
                  className="size-1 accent-accent-9"
                />
                {row.name}
              </label>
            </li>
          );
        })}
      </ul>

      <ActionBar
        open={selected.length > 0}
        onOpenChange={(open) => {
          if (!open) setSelected([]);
        }}
        side="bottom"
        align="center"
      >
        <ActionBarSelection>
          {selected.length} selected
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem
            onSelect={() => setSelected([])}
            aria-label="Archive"
          >
            <ArchiveIcon className="icon" aria-hidden />
            Archive
          </ActionBarItem>
          <ActionBarItem
            onSelect={() => setSelected([])}
            aria-label="Delete"
          >
            <TrashIcon className="icon" aria-hidden />
            Delete
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarClose aria-label="Clear selection">
          <Cross2Icon className="icon" aria-hidden />
        </ActionBarClose>
      </ActionBar>
    </div>
  );
};

export const ActionBarDemoTopAligned = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="relative min-h-32 w-full">
      <Button variant="pill" type="button" onClick={() => setOpen(true)}>
        Show action bar
      </Button>
      <ActionBar
        open={open}
        onOpenChange={setOpen}
        side="top"
        align="center"
        sideOffset={13}
      >
        <ActionBarSelection>3 selected</ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem onSelect={() => setOpen(false)}>
            <ArchiveIcon className="icon" aria-hidden />
            Archive
          </ActionBarItem>
          <ActionBarItem onSelect={() => setOpen(false)}>
            <TrashIcon className="icon" aria-hidden />
            Delete
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarClose aria-label="Close">
          <Cross2Icon className="icon" aria-hidden />
        </ActionBarClose>
      </ActionBar>
    </div>
  );
};

export const ActionBarDemoVertical = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="relative min-h-48 w-full">
      <Button variant="pill" type="button" onClick={() => setOpen(true)}>
        Show vertical bar
      </Button>
      <ActionBar
        open={open}
        onOpenChange={setOpen}
        orientation="vertical"
        side="bottom"
        align="end"
        sideOffset={13}
        alignOffset={13}
      >
        <ActionBarSelection>2 selected</ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem onSelect={() => setOpen(false)}>Archive</ActionBarItem>
          <ActionBarItem onSelect={() => setOpen(false)}>Delete</ActionBarItem>
        </ActionBarGroup>
        <ActionBarClose aria-label="Close">
          <Cross2Icon className="icon" aria-hidden />
        </ActionBarClose>
      </ActionBar>
    </div>
  );
};