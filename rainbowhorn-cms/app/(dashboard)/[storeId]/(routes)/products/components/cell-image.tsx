"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn } from "./columns";
import Image from "next/image";

interface CellImageProps{
    data: ProductColumn
}

export const CellImage:React.FC<CellImageProps> = ({
    data
}) => {
    ;

//    var url=data.images[0].url;

    return (
        <>
            <img src={data.image}/>
        </>
    )
}