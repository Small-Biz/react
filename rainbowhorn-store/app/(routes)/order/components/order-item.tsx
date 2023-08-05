import Image from "next/image"
import {X} from "lucide-react"

import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import {OrderItem} from "@/types"

interface OrderItemProps{
    data: OrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({
    data
}) => {

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.thumbnailUrl}
                    alt="Image"
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton icon={<X size={15}/>}/>
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black">
                            {data.productName}
                        </p>                        
                    </div>
                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">
                            {data.quantity}
                        </p>
                    </div>
                    <Currency value={data.price}/>
                </div>
            </div>
        </li>
    )
}

export default OrderItem;