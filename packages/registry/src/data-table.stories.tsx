"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../registry/default/components/DataTable/DataTable";

type SampleRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const sampleData: SampleRow[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "Admin",
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    name: "Alan Turing",
    email: "alan@example.com",
    role: "Editor",
    createdAt: "2024-05-20",
  },
  {
    id: "3",
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "Admin",
    createdAt: "2024-07-12",
  },
  {
    id: "4",
    name: "Margaret Hamilton",
    email: "margaret@example.com",
    role: "Editor",
    createdAt: "2024-04-02",
  },
  {
    id: "5",
    name: "Edsger Dijkstra",
    email: "edsger@example.com",
    role: "Viewer",
    createdAt: "2024-03-15",
  },
  {
    id: "6",
    name: "Barbara Liskov",
    email: "barbara@example.com",
    role: "Admin",
    createdAt: "2024-08-01",
  },
  {
    id: "7",
    name: "Donald Knuth",
    email: "don@example.com",
    role: "Viewer",
    createdAt: "2024-01-28",
  },
  {
    id: "8",
    name: "Frances Allen",
    email: "frances@example.com",
    role: "Editor",
    createdAt: "2024-02-10",
  },
  {
    id: "9",
    name: "Ken Thompson",
    email: "ken@example.com",
    role: "Viewer",
    createdAt: "2024-06-18",
  },
  {
    id: "10",
    name: "Dennis Ritchie",
    email: "dennis@example.com",
    role: "Editor",
    createdAt: "2024-05-05",
  },
  {
    id: "11",
    name: "Brian Kernighan",
    email: "brian@example.com",
    role: "Viewer",
    createdAt: "2024-07-22",
  },
  {
    id: "12",
    name: "Leslie Lamport",
    email: "leslie@example.com",
    role: "Admin",
    createdAt: "2024-09-01",
  },
];

const columns: ColumnDef<SampleRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => row.original.createdAt,
  },
];

export const Default = () => {
  return (
    <div className="mx-auto max-w-5xl p-2">
      <DataTable<SampleRow>
        title="Team directory"
        description="Sample rows for Ladle"
        columns={columns}
        data={sampleData}
        searchPlaceholder="Search people…"
        sortOptions={[
          {
            value: "recent",
            label: "Newest first",
            sorting: [{ id: "createdAt", desc: true }],
          },
          {
            value: "oldest",
            label: "Oldest first",
            sorting: [{ id: "createdAt", desc: false }],
          },
        ]}
        onRefresh={() => {
          // no-op for demo
        }}
        initialPageSize={10}
      />
    </div>
  );
};
