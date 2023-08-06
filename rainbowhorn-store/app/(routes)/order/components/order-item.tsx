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
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-24 sm:w-24">
                <Image
                    fill
                    src={data.thumbnailUrl}
                    alt="Image"
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-top sm:ml-6 gap-y-2">
                <div className="relative pr-9 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pr-0">
                    <div>
                        <p className="text-lg font-semibold text-black">
                            {data.productName}
                        </p>
                    </div>
                    <div className="sm:text-right">
                        <Currency value={data.price}/>
                    </div>
                    <div className="text-sm">
                        <p className="text-gray-500 text-base font-bold sm:float-right">
                            x {data.quantity}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-600">{data.description}</p>
                </div>
            </div>
        </li>
    )
}

export default OrderItem;