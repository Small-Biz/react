"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {useOrigin} from "@/hooks/use-origin";
import { Separator } from "@/components/ui/separator";
import Product from "@/data/product";
import Category from "@/data/category";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    images: z.object({url: z.string()}).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    status: z.string().min(1),
})

interface ProductFormProps{
    initialData:Product 
    //& {images : ProductImage[]
    //}
     | null,
    categories: Category[]
}

type ProductFormValues = z.infer<typeof formSchema>;

export const ProductForm:React.FC<ProductFormProps>=({
    initialData,
    categories
})=>{

    const params=useParams();
    const router=useRouter();
    const origin=useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated" : "Product created";
    const action = initialData ? "Save changes" : "Create";

    const form=useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price)),
        } : {
            name: '',
            description: '',
            images: [],
            price: 0,
            categoryId: '',
            isFeatured: false,
            status: 'PENDING'
        }
    });

    const onSubmit=async (data: ProductFormValues) =>{
        console.log(data);
        try{
            setLoading(true);
            if (initialData){
                const response=await axios.patch(`http://localhost:8090/admin/${params.storeId}/products/${params.productId}`,data);
            }else{
                const response=await axios.post(`http://localhost:8090/admin/${params.storeId}/products`,data);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
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
            const response=await axios.delete(`http://localhost:8090/admin/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted.");
        }catch(error){
            toast.error("Something went wrong.");
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
                    
                    
                    <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}                            
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}                            
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9.99" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}                            
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                defaultValue={field.value}
                                                placeholder={"Select a category"}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category)=>(
                                                <SelectItem
                                                key={category.id}
                                                value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}                            
                        />

                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field })=>(
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            //@ts-ignore
                                            onCheckedChange={field.onChange}
                                        ></Checkbox>
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will appear on the home page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}                            
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field })=>(
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                defaultValue={field.value}
                                                placeholder={"Select a status"}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key="PENDING" value="PENDING">Pending</SelectItem>
                                            <SelectItem key="PUBLISHED" value="PUBLISHED">Published</SelectItem>
                                            <SelectItem key="LOCKED" value="LOCKED">Locked</SelectItem>
                                            <SelectItem key="DELETED" value="DELETED">Deleted</SelectItem>
                                        </SelectContent>
                                    </Select>
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
