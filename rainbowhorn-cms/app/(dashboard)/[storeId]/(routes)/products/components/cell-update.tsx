"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn } from "./columns";

interface CellUpdateProps{
    data: ProductColumn
}

export const CellUpdate:React.FC<CellUpdateProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <Button onClick={()=> router.push(`/${params.storeId}/products/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4"/>
                Update
            </Button>
        </>
    )
}