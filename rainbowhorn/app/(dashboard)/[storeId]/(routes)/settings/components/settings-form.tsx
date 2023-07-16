"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Store from "@/data/store";
import { Separator } from "@radix-ui/react-separator";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";

interface SettingsFormProps{
    initialData:Store;
}

const formSchema = z.object({
    name:z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm:React.FC<SettingsFormProps>=({
    initialData
})=>{

    const params=useParams();
    const router=useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form=useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit=async (data: SettingsFormValues) =>{
        console.log(data);
        try{
            setLoading(true);
            const response=await axios.patch(`http://localhost:8090/admin/stores/${initialData.id}`,data);
            router.refresh();
            toast.success("Store updated.");
        }catch (error){
            toast.error("Something went wrong.");
        }finally{
            setLoading(false);
        }

    }

    const onDelete=async () => {
        try{
            setLoading(true);
            const response=await axios.delete(`http://localhost:8090/admin/stores/${initialData.id}`);
            router.refresh();
            router.push('/');
            toast.success("Store deleted.");
        }catch(error){
            toast.error("Make sure you removed all products and categories first.");
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
            <div className="flex items-center justify-between">
                <Heading
                    title="Setting"
                    description="Manager store preferences"
                />

                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={()=> setOpen(true)}
                >
                <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}                            
                        />
                    </div>
                    <Button disabled={loading} 
                        className="ml-auto" 
                        type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" 
                description={`${origin}/admin/${params.storeId}`}
                variant="public"
            ></ApiAlert>
        </>
    )
}
