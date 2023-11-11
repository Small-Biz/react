"use client"

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart, Truck } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps{
    data: Product;
}

const Info:React.FC<InfoProps> = ({
    data
}) =>{

    const cart = useCart();

    const onAddToCart=() =>{
        cart.addItem(data);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            <span className="text-base">{data.description}</span>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price}/>
                </p>
                <span className="text-sm text-gray-500">All taxes included</span>
            </div>
            <hr className="my-4"/>
            <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Size:</h3>
                <div>
                    M
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="w-full flex justify-center gap-x-2 bg-purple-400">
                    Add To Cart
                    <ShoppingCart/>
                </Button>
            </div>
            <hr className="my-4"/>
            <div><Truck/> Free shipping on all orders</div>
            <div>Delivery: 2~3 weeks</div>

        </div>
    )
}

export default Info;