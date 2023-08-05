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
                    <div>Client:</div><div>{order.name}</div>
                    <div>Order ID:</div><div>{order.id}</div>
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>
                    <Currency value={order.totalAmount}/>

                    <div>Contact email:</div><div>{order.email}</div>
                    <div>Contact phone:</div><div>{order.phone}</div>
                    <div>Shipping Address:</div><div>{order.shippingAddress}</div>
                    <div>Remark:</div><div>{order.remark}</div>
                    <div>Date:</div><div>{order.createdAt}</div>
                    <div>Status:</div><div>{order.status}</div>
                </div>
            </div>
            <Button onClick={onCancel} className="w-full mt-6">
                Cancel
            </Button>
        </div>
    )
}

export default Summary;