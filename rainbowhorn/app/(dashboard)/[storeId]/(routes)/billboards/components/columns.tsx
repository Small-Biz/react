"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  label: number
  createdAt: string
  updatedAt: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Created Time",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated Time",
  },
  {
    id: "action",
    cell: ({row}) => <CellAction data={row.original}/>
  },
]
