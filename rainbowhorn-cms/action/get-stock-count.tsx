import Product from "@/data/product";
import axios from "axios"

export const getStockCount = async (storeId: string) => {

    const response=await axios.get(`http://localhost:8090/admin/${storeId}/products`);
    const products:Product[]=response.data.productList;

    const stockCount = products.reduce((count, product) =>{
       
        return count +product.stock;

    }, 0);

    return stockCount;
}