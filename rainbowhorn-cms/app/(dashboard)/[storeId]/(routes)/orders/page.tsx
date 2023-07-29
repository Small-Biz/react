import {format} from "date-fns";
import axios from "axios";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import Order from "@/data/order";
import { formatter } from "@/lib/utils";

const OrdersPage= async({
    params
}:{
    params: {storeId:string}
})=>{

    const response=await axios.get(`http://localhost:8090/admin/${params.storeId}/orders`);
    const orders=response.data.orderList;

    const formattedOrders:OrderColumn[] = orders.map((order:Order)=>({
        id: order.id,
        userId: order.userId,
        phone: order.phone,
        products: order.orderItemList?.map((item)=> item.productName).join(', '),
        totalAmount: formatter.format(order.totalAmount),        
        status: order.status,
        createdAt: format(order.createdAt, "MMMM do, yyyy"),
        updatedAt: format(order.updatedAt, "MMMM do, yyyy")
    }));


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders}/>
            </div>
        </div>
    )
}

export default OrdersPage;