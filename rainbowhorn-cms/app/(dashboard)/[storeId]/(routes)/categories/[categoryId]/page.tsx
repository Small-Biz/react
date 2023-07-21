import Category from "@/data/category";
import axios from "axios";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
    params
}:{
    params: {categoryId: string}
}) =>{
    
    const response = await axios.get(`http://localhost:8090/admin/categories/${params.categoryId}`);
    var category:Category=response.data.category;

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initialData={category}/>
            </div>
        </div>
    )
}

export default CategoryPage;