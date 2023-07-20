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

    const formattedOrders:OrderColumn[] = orders.map((item:Order)=>({
        id: item.id,
        userId: item.userId,
        phone: item.phone,
        products: item.orderItems.map((item)=> item.productName).join(', '),
        totalAmount: formatter.format(item.totalAmount),        
        status: item.status,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        updatedAt: format(item.updatedAt, "MMMM do, yyyy")
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