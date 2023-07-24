"use client"

import axios from "axios"
import {useEffect} from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"

import Button from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"



const Summary = () =>{

    const router=useRouter();
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if ( searchParams.get("success")){
            toast.success("Payment completed");
            removeAll();
        }
        if ( searchParams.get("cancelled")){
            toast.error("Something went wrong.");
        }
    }), [searchParams, removeAll];

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0);

    const onCheckout = async () => {
        console.log("rayTest onCheckout");

        
        try{
            const response = await axios.post('http://localhost:8090/api/paymentintent', {
                productId: items.map((item) => item.id),
                totalAmount: 1099.99,
                featureRequest: "This is featureRequst"
            });
            
            const stripeSecret=response.data.stripeSecret;

            //window.location = response.data.url;
            router.push(`/checkout?stripeSecret=${stripeSecret}`);
        }catch(error){
            toast.error("Something went wrong.");
        }
    }

    return (
        <div className="
        mt-6
        rounded=lg
        bg-gray-50
        px-4
        py-6
        sm:p-6
        lg:col-span-5
        lg:mt-0
        lg:p-8
        ">
            <h2 className="text-lg font-medium text-gray-900">
                Order Smmary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>
                    <Currency value={totalPrice}/>
                </div>
            </div>
            <Button onClick={onCheckout} className="w-full mt-6">
                Checkout
            </Button>
        </div>
    )
}

export default Summary;