import { Product } from "@/types";
import axios from "axios";

const URL = `http://localhost:8090/api/17/products`;

const getFeaturedProducts = async (): Promise<Product[]> => {

    const response=await axios.get(`${URL}`);
    return response.data.productList;
};

export default getFeaturedProducts;