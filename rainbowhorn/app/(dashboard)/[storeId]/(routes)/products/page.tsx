import {format} from "date-fns";
import axios from "axios";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import Product from "@/data/product";
import { formatter } from "@/lib/utils";

const BillboardsPage= async({
    params
}:{
    params: {storeId:string}
})=>{

    const response=await axios.get(`http://localhost:8090/admin/${params.storeId}/products`);
    const products=response.data.productList;

    const formattedProducts:ProductColumn[] = products.map((item:Product)=>({
        id: item.id,
        name: item.name,
        price: formatter.format(item.price),
        description: item.description,
        stock: item.stock,
        category: item.categoryId,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        updatedAt: format(item.updatedAt, "MMMM do, yyyy")
    }));


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts}/>
            </div>
        </div>
    )
}

export default BillboardsPage;