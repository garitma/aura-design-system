"use client";

import { faker } from "@faker-js/faker";
import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { DataGrid } from "../registry/default/components/DataGrid/DataGrid";
import { DataGridKeyboardShortcuts } from "../registry/default/components/DataGrid/DataGridKeyboardShortcuts";
import { useDataGrid } from "../registry/default/components/DataGrid/use-data-grid";
import { Checkbox } from "../registry/default/components/ui/Checkbox";
import { cn } from "../registry/default/utils/class-names";

interface SkateTrick {
  id: string;
  trickName?: string;
  skaterName?: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | "expert";
  variant?: "flip" | "grind" | "grab" | "transition" | "manual" | "slide";
  landed?: boolean;
  attempts?: number;
  bestScore?: number;
  location?: string;
  dateAttempted?: string;
}

const skateSpots = [
  "Venice Beach Skate Park",
  "Burnside Skate Park",
  "Love Park (Philadelphia)",
  "MACBA (Barcelona)",
  "Southbank (London)",
  "FDR Skate Park",
  "Brooklyn Banks",
  "El Toro High School",
  "Hubba Hideout",
  "Wallenberg High School",
  "EMB (Embarcadero)",
  "Pier 7 (San Francisco)",
] as const;

const skateTricks = {
  flip: [
    "Kickflip",
    "Heelflip",
    "Tre Flip",
    "Hardflip",
    "Inward Heelflip",
    "Frontside Flip",
    "Backside Flip",
    "Varial Flip",
    "Varial Heelflip",
    "Double Flip",
    "Laser Flip",
    "Anti-Casper Flip",
    "Casper Flip",
    "Impossible",
    "360 Flip",
    "Big Spin",
    "Bigspin Flip",
  ],
  grind: [
    "50-50 Grind",
    "5-0 Grind",
    "Nosegrind",
    "Crooked Grind",
    "Feeble Grind",
    "Smith Grind",
    "Lipslide",
    "Boardslide",
    "Tailslide",
    "Noseslide",
    "Bluntslide",
    "Nollie Backside Lipslide",
    "Switch Frontside Boardslide",
  ],
  grab: [
    "Indy Grab",
    "Melon Grab",
    "Stalefish",
    "Tail Grab",
    "Nose Grab",
    "Method",
    "Mute Grab",
    "Crail Grab",
    "Seatbelt Grab",
    "Roast Beef",
    "Chicken Wing",
    "Tweaked Indy",
    "Japan Air",
  ],
  transition: [
    "Frontside Air",
    "Backside Air",
    "McTwist",
    "540",
    "720",
    "900",
    "Frontside 180",
    "Backside 180",
    "Frontside 360",
    "Backside 360",
    "Alley-Oop",
    "Fakie",
    "Revert",
    "Carve",
    "Pump",
    "Drop In",
  ],
  manual: [
    "Manual",
    "Nose Manual",
    "Casper",
    "Rail Stand",
    "Pogo",
    "Handstand",
    "One Foot Manual",
    "Spacewalk",
    "Truckstand",
    "Primo",
  ],
  slide: [
    "Powerslide",
    "Bert Slide",
    "Coleman Slide",
    "Pendulum Slide",
    "Stand-up Slide",
    "Toeside Slide",
    "Heelside Slide",
  ],
} as const;

function generateTrickData(): SkateTrick[] {
  return Array.from({ length: 30 }, () => {
    const variant = faker.helpers.arrayElement(
      Object.keys(skateTricks) as Array<keyof typeof skateTricks>,
    );
    const trickName = faker.helpers.arrayElement(skateTricks[variant]);
    const skaterName = faker.person.fullName();
    const attempts = faker.number.int({ min: 1, max: 50 });
    const landed = faker.number.int({ min: 1, max: 100 }) <= 60;

    const getDifficulty = (trick: string): SkateTrick["difficulty"] => {
      const expertTricks = [
        "Tre Flip",
        "900",
        "McTwist",
        "Laser Flip",
        "Impossible",
      ];
      const advancedTricks = [
        "Hardflip",
        "720",
        "540",
        "Crooked Grind",
        "Switch Frontside Boardslide",
      ];
      const intermediateTricks = [
        "Kickflip",
        "Heelflip",
        "Frontside 180",
        "50-50 Grind",
        "Boardslide",
      ];

      if (expertTricks.some((t) => trick.includes(t))) return "expert";
      if (advancedTricks.some((t) => trick.includes(t))) return "advanced";
      if (intermediateTricks.some((t) => trick.includes(t)))
        return "intermediate";
      return "beginner";
    };

    const difficulty = getDifficulty(trickName);

    const attempted = faker.date.between({
      from: new Date(2023, 0, 1),
      to: new Date(),
    });

    return {
      id: faker.string.nanoid(),
      trickName,
      skaterName,
      difficulty,
      variant,
      landed,
      attempts,
      bestScore: landed
        ? faker.number.int({ min: 6, max: 10 })
        : faker.number.int({ min: 1, max: 5 }),
      location: faker.helpers.arrayElement(skateSpots),
      dateAttempted: attempted.toISOString().split("T")[0] ?? "",
    };
  });
}

function DataGridDemo() {
  const [data, setData] = React.useState<SkateTrick[]>(generateTrickData());

  const columns = React.useMemo<ColumnDef<SkateTrick>[]>(
    () => [
      {
        id: "select",
        size: 52,
        minSize: 52,
        maxSize: 52,
        enableResizing: false,
        header: ({ table }) => {
          const hasRowSelection =
            table.getIsSomePageRowsSelected() ||
            table.getIsAllPageRowsSelected();
          return (
            <div
              className={cn(
                "flex size-full flex-col items-center justify-center px-1",
                "transition-opacity duration-150",
                hasRowSelection
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
              )}
            >
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllRowsSelected(!!value)
                }
                aria-label="Select all rows"
                className="border-accent-9"
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          );
        },
        cell: ({ row }) => (
          <div
            className={cn(
              "flex size-full flex-col items-center justify-center px-1",
              "opacity-0 transition-opacity duration-150",
              "group-hover:opacity-100 group-focus-within:opacity-100",
              "group-[[aria-selected=true]]:opacity-100",
            )}
          >
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              disabled={!row.getCanSelect()}
              aria-label={`Select row ${row.index + 1}`}
              className="border-accent-9"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ),
      },
      {
        id: "trickName",
        accessorKey: "trickName",
        header: "Trick name",
        meta: {
          cell: {
            variant: "short-text",
          },
        },
        minSize: 180,
      },
      {
        id: "skaterName",
        accessorKey: "skaterName",
        header: "Skater",
        meta: {
          cell: {
            variant: "short-text",
          },
        },
        minSize: 150,
      },
      {
        id: "difficulty",
        accessorKey: "difficulty",
        header: "Difficulty",
        meta: {
          cell: {
            variant: "select",
            options: [
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
              { label: "Expert", value: "expert" },
            ],
          },
        },
        minSize: 120,
      },
      {
        id: "variant",
        accessorKey: "variant",
        header: "Category",
        meta: {
          cell: {
            variant: "select",
            options: [
              { label: "Flip", value: "flip" },
              { label: "Grind", value: "grind" },
              { label: "Grab", value: "grab" },
              { label: "Transition", value: "transition" },
              { label: "Manual", value: "manual" },
              { label: "Slide", value: "slide" },
            ],
          },
        },
        minSize: 120,
      },
      {
        id: "landed",
        accessorKey: "landed",
        header: "Landed",
        meta: {
          cell: {
            variant: "checkbox",
          },
        },
        minSize: 100,
      },
      {
        id: "attempts",
        accessorKey: "attempts",
        header: "Attempts",
        meta: {
          cell: {
            variant: "number",
            min: 1,
            max: 100,
          },
        },
        minSize: 100,
      },
      {
        id: "bestScore",
        accessorKey: "bestScore",
        header: "Score",
        meta: {
          cell: {
            variant: "number",
            min: 1,
            max: 10,
          },
        },
        minSize: 110,
      },
      {
        id: "location",
        accessorKey: "location",
        header: "Location",
        meta: {
          cell: {
            variant: "select",
            options: skateSpots.map((spot) => ({ label: spot, value: spot })),
          },
        },
        minSize: 180,
      },
      {
        id: "dateAttempted",
        accessorKey: "dateAttempted",
        header: "Attempted at",
        meta: {
          cell: {
            variant: "date",
          },
        },
        minSize: 130,
      },
    ],
    [],
  );

  const onRowAdd = React.useCallback(() => {
    let insertedIndex = 0;
    setData((prev) => {
      insertedIndex = prev.length;
      return [...prev, { id: faker.string.nanoid() }];
    });

    return {
      rowIndex: insertedIndex,
      columnId: "trickName",
    };
  }, []);

  const onRowsDelete = React.useCallback(
    async (rowsToDelete: SkateTrick[]) => {
      const ids = new Set(rowsToDelete.map((r) => r.id));
      setData((prev) => prev.filter((row) => !ids.has(row.id)));
    },
    [],
  );

  const { table, ...dataGridProps } = useDataGrid({
    columns,
    data,
    onDataChange: setData,
    onRowAdd,
    onRowsDelete,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    initialState: {
      columnPinning: {
        left: ["select"],
      },
    },
    enablePaste: true,
  });

  return (
    <>
      <DataGridKeyboardShortcuts
        enableSearch={!!dataGridProps.searchState}
        enableRowsDelete
      />
      <DataGrid {...dataGridProps} table={table} height={340} />
    </>
  );
}

export const Default = DataGridDemo;
