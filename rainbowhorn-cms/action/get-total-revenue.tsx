import Order from "@/data/order";
import axios from "axios"

export const getTotalRevenue = async (storeId: string) => {

    const response=await axios.get(`http://localhost:8090/admin/${storeId}/orders`);
    const orders:Order[]=response.data.orderList;

    const totalRevenue = orders.reduce((total, order) =>{
       
        if ( order.status === 'PAID'){
            return total + order.totalAmount;
        }else{
            return total;
        }
    }, 0);

    return totalRevenue;
}