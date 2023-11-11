"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellUpdate } from "./cell-update"
import { CellDelete } from "./cell-delete"
import { CellImage } from "./cell-image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  description: string
  image:string
  price: string
  category: string
  createdAt: string
  updatedAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "thumbnail",
    cell: ({row}) => <CellImage data={row.original}/>
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
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
