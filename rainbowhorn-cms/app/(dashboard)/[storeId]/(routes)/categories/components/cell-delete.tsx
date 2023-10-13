"use client";

import React, { useState } from "react";
import { CategoryColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellDeleteProps{
    data: CategoryColumn
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
            const response=await axios.delete(`http://localhost:8090/admin/${params.storeId}/categories/${data.id}`);
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast.success("Category deleted.");
        }catch(error){
            toast.error("Make sure you removed all products using this category first");
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
            <Button onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4"/>
                Delete
            </Button>
        </>
    )
}