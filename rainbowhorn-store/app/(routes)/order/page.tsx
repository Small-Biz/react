"use client";

import * as z from "zod";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";

const formSchema = z.object({
    email: z.string().min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
//    .refine((e) => e === "abcd@fg.com", "This email is not in our database"),

    orderId: z.string().min(1, { message: "This field has to be filled." })
});

type OrderFormValues = z.infer<typeof formSchema>;

const OrderPage = () => {

    const [loading,setLoading] = useState(false);
    const [showDetails,setShowDetails] = useState(false);
    const [showError,setShowError] = useState(false);

    const form=useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            orderId: ''
        }
    });

    const onSubmit=async (data:OrderFormValues)=>{
        //submit email,orderId to get order details
        console.log('submit  ' + data.email + ' ' + data.orderId);

        setShowError(false);

        try{
            const response=await axios.get(`http://localhost:8090/api/orders/${data.orderId}?email=${data.email}`);
        }catch(error){
            console.log('error');
            setShowError(true);
        }

    }

    return (
        <Container>
            <div className="p-4 sm:p-6 lg:p-8 overflow-hidden order-solid">
                <div  className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
                    <div className="h-full w-full flex flex-col justify-center items-center gap-y-8">
                        <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                            Search Order
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-8 w-full  sm:max-w-xl max-w-xs">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field })=>(
                                            <FormItem>
                                                <FormLabel>E-mail</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Payment contact email" {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}                            
                                    />

                                    <FormField
                                        control={form.control}
                                        name="orderId"
                                        render={({ field })=>(
                                            <FormItem>
                                                <FormLabel>Ordere ID</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Order ID" {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}                            
                                    />
                                    <div>
                                        To search your order status, please fill in your email and order ID. You could find the order ID from the payment confirmaion email. 
                                    </div>
                                    {showError &&(
                                    <div className="text-red-500">
                                        Order not found. 
                                    </div>)
                                    }
                                    <Button disabled={loading} 
                                        type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Form>

                    </div>
                </div>
            </div>
        </Container>
    )
}

export default OrderPage;