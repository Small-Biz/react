import {format} from "date-fns";
import axios from "axios";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import Category from "@/data/category";

const CategoriesPage= async({
    params
}:{
    params: {storeId:string}
})=>{

    const response=await axios.get(`http://localhost:8090/admin/${params.storeId}/categories`);
    const categories=response.data.categoryList;

    const formattedCategories:CategoryColumn[] = categories.map((item:Category)=>({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        updatedAt: format(item.updatedAt, "MMMM do, yyyy")
    }));


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    )
}

export default CategoriesPage;