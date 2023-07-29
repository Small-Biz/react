import Order from "@/data/order";
import axios from "axios"

export const getSalesCount = async (storeId: string) => {

    const response=await axios.get(`http://localhost:8090/admin/${storeId}/orders`);
    const orders:Order[]=response.data.orderList;

    const salesCount = orders.reduce((count, order) =>{
       
        if ( order.status === 'PAID'){
            return count + 1;
        }else{
            return count;
        }
    }, 0);

    return salesCount;
}