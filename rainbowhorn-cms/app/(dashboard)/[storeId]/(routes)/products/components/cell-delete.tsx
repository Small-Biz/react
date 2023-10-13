"use client";

import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { ProductColumn } from "./columns";

interface CellDeleteProps{
    data: ProductColumn
}

export const CellDelete:React.FC<CellDeleteProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onDelete=async () => {
        try{
            setLoading(true);
            const response=await axios.delete(`http://localhost:8090/admin/${params.storeId}/products/${data.id}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted.");
        }catch(error){
            toast.error("Make sure you removed all image using this product first");
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={()=> setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <Button
                onClick={() => setOpen(true)}
            >
            <Trash className="mr-2 h-4 w-4"/>
                        Delete
                        </Button>
        </>
    )
}