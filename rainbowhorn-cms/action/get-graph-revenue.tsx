import Order from "@/data/order";
import axios from "axios"

interface GraphData {
    name: string;
    total: number;
}

export const getGraphRevenue = async (storeId: string) => {

    const response=await axios.get(`http://localhost:8090/admin/${storeId}/orders`);
    const orders:Order[]=response.data.orderList;

    const monthlyRevenue: { [Key: number]:number} = {};

    for ( const order of orders ){
        if ( order.status === 'PAID'){

            const month = new Date(order.createdAt).getMonth();
            let revenueForOrder = order.totalAmount;

            monthlyRevenue[month] = ( monthlyRevenue[month] || 0) + revenueForOrder;

        }

    }

    const graphData: GraphData[] = [
        {name: "Jan", total: 0},
        {name: "Feb", total: 0},
        {name: "Mar", total: 0},
        {name: "Apr", total: 0},
        {name: "May", total: 0},
        {name: "Jun", total: 0},
        {name: "Jul", total: 0},
        {name: "Aug", total: 0},
        {name: "Sep", total: 0},
        {name: "Oct", total: 0},
        {name: "Nov", total: 0},
        {name: "Dec", total: 0},
    ]

    for ( const month in monthlyRevenue){
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
}