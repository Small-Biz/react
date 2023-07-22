import { Product } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/17/products`;

const getProducts = async (categoryId:string): Promise<Product[]> => {

    const response=await axios.get(`${URL}/?categoryId=${categoryId}`);
    return response.data.productList;
};

export default getProducts;