"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string
  userId: string
  phone: string
  products: string
  totalAmount: string
  status: string
  remark: string
  createdAt: string
  updatedAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created Time",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated Time",
  },
]
