"use client"

import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"

import Button from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import { Order } from "@/types"

interface SummaryProps{
    order:Order;
}

const Summary: React.FC<SummaryProps> = ({
    order
}) =>{

    const router=useRouter();

    const onCancel = async () => {

    }

    const headStyle=()=>{
        return "font-semibold";
    }

    const contentStyle=()=>{
        return "text-base font-medium text-gray-900";
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
                <div className="sm:grid sm:grid-cols-2 border-t border-gray-200 pt-4">
                    <div className={headStyle()}>Client:</div><div className={contentStyle()}>{order.name}</div>
                    <div className={headStyle()}>Order ID:</div><div className={contentStyle()}>{order.id}</div>                    
                    <div  className={headStyle()}>Order total</div><div className={contentStyle()}><Currency value={order.totalAmount}/></div>
                    <div className={headStyle()}>Contact email:</div><div className={contentStyle()}>{order.email}</div>
                    <div className={headStyle()}>Contact phone:</div><div className={contentStyle()}>{order.phone}</div>
                    <div className={headStyle()}>Shipping Address:</div><div className={contentStyle()}>{order.shippingAddress}</div>
                    <div className={headStyle()}>Remark:</div><div className={contentStyle()}>{order.remark}</div>
                    <div className={headStyle()}>Date:</div><div className={contentStyle()}>{order.createdAt}</div>
                    <div className={headStyle()}>Status:</div><div className={contentStyle()}>{order.status}</div>
                </div>
            </div>
            <Button onClick={onCancel} className="w-full mt-6">
                Cancel
            </Button>
        </div>
    )
}

export default Summary;