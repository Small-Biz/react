"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { CellUpdate } from "./cell-update"
import { CellDelete } from "./cell-delete"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  createdAt: string
  updatedAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },{
    accessorKey: "name",
    header: "Name",
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
    cell: ({row}) => <CellUpdate data={row.original}/>
  },
  {
    id: "action",
    cell: ({row}) => <CellDelete data={row.original}/>
  },  
]
