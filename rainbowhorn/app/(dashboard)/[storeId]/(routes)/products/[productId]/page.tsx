import Product from "@/data/product";
import axios from "axios";
import { ProductForm } from "./components/product-form";
import Category from "@/data/category";

const ProductPage = async ({
    params
}:{
    params: {productId: string, storeId: string}
}) =>{
    
    const response = await axios.get(`http://localhost:8090/admin/products/${params.productId}`);
    var product:Product=response.data.product;

    const response2 = await axios.get(`http://localhost:8090/admin/${params.storeId}/categories`);
    var categories:Category[]=response2.data.categoryList;

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                initialData={product}
                categories={categories}/>
            </div>
        </div>
    )
}

export default ProductPage;