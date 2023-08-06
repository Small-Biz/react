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
import { Order } from "@/types";
import OrderItem from "./components/order-item";
import Summary from "./components/summary";
import OrderStepper from "@/components/ui/order-stepper";

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
    const [order,setOrder] = useState<Order|undefined>(undefined);
    
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
        setOrder(undefined);
        setShowError(false);

        try{
            const response=await axios.get(`http://localhost:8090/api/orders/${data.orderId}?email=${data.email}`);
            setOrder(response.data.order);
            setShowDetails(true);
        }catch(error){
            console.log('error');
            setShowError(true);
        }

    }

    return (

        <Container>
            {showDetails&&order&&(
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black">Order Details</h1>
                <OrderStepper orderStatus={order.status}/>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                    <div className="lg:col-span-7">
                        {order.orderItemList.length===0 && <p className="text-neutral-500">No items in the order</p>}
                        <ul>
                            {order.orderItemList.map((item)=>(
                                <OrderItem
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                        </ul>
                    </div>
                    <Summary order={order}/>
                </div>
                <div className="
                    mt-6
                    rounded=lg
                    bg-gray-50
                    px-4
                    py-6
                    sm:p-6
                    lg:col-span-5
                    lg:mt-10
                    lg:p-8
                    ">
                    <div className="text-center">
                        <h2 className="text-lg font-medium text-gray-900">
                            Disclaimer                    
                        </h2>
                        <span className="text-xs">
                        The information contained in this website is for general information purposes only. The information is provided by Rainbowhorn and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.

In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.

Through this website you are able to link to other websites which are not under the control of Rainbowhorn. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

Every effort is made to keep the website up and running smoothly. However, Rainbowhorn takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
                        </span>
                    </div>

            </div>
            </div> 
            )}

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