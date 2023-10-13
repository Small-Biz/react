"use client";

import React, { useState } from "react";
import { CategoryColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface CellUpdateProps{
    data: CategoryColumn
}

export const CellUpdate:React.FC<CellUpdateProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <Button onClick={()=> router.push(`/${params.storeId}/categories/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4"/>
                Update
            </Button>
        </>
    )
}