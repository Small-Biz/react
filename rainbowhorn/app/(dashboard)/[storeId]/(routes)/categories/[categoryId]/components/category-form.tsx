"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Store from "@/data/store";
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
import {useOrigin} from "@/hooks/use-origin";
import { Separator } from "@/components/ui/separator";
import Category from "@/data/category";

const formSchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().min(1)
})

interface CategoryFormProps{
    initialData:Category | null;
}

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm:React.FC<CategoryFormProps>=({
    initialData
})=>{

    const params=useParams();
    const router=useRouter();
    const origin=useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a new category";
    const toastMessage = initialData ? "Category updated" : "Category created";
    const action = initialData ? "Save changes" : "Create";

    const form=useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            imageUrl: ''
        }
    });

    const onSubmit=async (data: CategoryFormValues) =>{
        console.log(data);
        try{
            setLoading(true);
            if (initialData){
                const response=await axios.patch(`http://localhost:8090/admin/${params.storeId}/categories/${params.categoryId}`,data);
            }else{
                const response=await axios.post(`http://localhost:8090/admin/${params.storeId}/categories`,data);
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast.success(toastMessage);
        }catch (error){
            toast.error("Something went wrong.");
        }finally{
            setLoading(false);
        }

    }

    const onDelete=async () => {
        try{
            setLoading(true);
            const response=await axios.delete(`http://localhost:8090/admin/${params.storeId}/categories/${params.categoryId}`);
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
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />

                {initialData && (
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={()=> setOpen(true)}
                >
                <Trash className="h-4 w-4"/>
                </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field })=>(
                            <FormItem>
                                <FormLabel>Background image url</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Image url" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}                            
                    />
                    <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Category name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}                            
                        />
                    </div>
                    <Button disabled={loading} 
                        className="ml-auto" 
                        type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
    )
}
